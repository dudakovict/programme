const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Email must be valid']
    },
    role: {
        type: String,
        enum: ['user', 'tutor', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm password is required'],
        validate: {
            validator: function(pass) {
                return pass === this.password
            },
            message: 'Passswords are different'
        }
    },
    photo: {
        type: String,
        default: 'default.jpg'
    },
    passwordChangedAt: Date,
    active: {
        type: Boolean,
        default: true
    }
})

userSchema.methods.isCorrectPassword = async function(inputPassword, userPassword) {
    return await bcrypt.compare(inputPassword, userPassword)
}

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false }})
    next()
})

userSchema.methods.hasChangedPassword = function(JWTTS) {
    if (this.passwordChangedAt) {
        const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
        return JWTTS < changedAt
    }
    return false
}

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next()
    this.passwordChangedAt = Date.now() - 1000
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User