const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        require: [true, 'Subject is requires']
    },
    paid: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

paymentSchema.pre(/^find/, function(next) {
    this.populate('user').populate({
        path: 'subject',
        select: 'name'
    })
    next()
})

paymentSchema.index({ user: 1, subject: 1}, { unique: true })

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment