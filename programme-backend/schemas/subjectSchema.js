const mongoose = require('mongoose')
const slugify = require('slugify')

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    slug: String,
    avgRatings: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be > 1'],
        max: [5, 'Rating must be < 5'],
        set: val => Math.round(val * 10) / 10
    },
    numRatings: {
        type: Number,
        default: 0
    },
    summary: {
        type: String,
        description: [true, 'Summary is required']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    photo: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    tutors: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

subjectSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'tutors',
        select: 'name role photo'
    })
    next()
})

subjectSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'subject',
    localField: '_id'
})

subjectSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

subjectSchema.index({ price: 1, avgRatings: -1 })
subjectSchema.index({ slug: 1 })

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject