const mongoose = require('mongoose')
const Subject = require('./subjectSchema')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review is required']
    },
    subject: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subject',
        required: [true, 'Subject is required']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

reviewSchema.statics.calcAvgRatings = async function(subjectId) {
    const stats = await this.aggregate([
        {
            $match: { subject: subjectId}
        },
        {
            $group: {
                _id: '$subject',
                avgRating: { $avg: '$rating' },
                numRating: { $sum: 1}
            }
        }
    ])

    if (stats.length > 0) {
        await Subject.findByIdAndUpdate(subjectId, {
            avgRatings: stats[0].avgRating,
            numRatings: stats[0].numRating
        })
    } else {
        await Subject.findByIdAndUpdate(subjectId, {
            avgRatings: 4.5,
            numRatings: 0
        })
    }
}

reviewSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    }).populate({
        path: 'subject',
        select: 'name photo avgRatings'
    })
    next()
})

reviewSchema.post('save', async function() {
    this.constructor.calcAvgRatings(this.subject)
})

reviewSchema.pre(/^findOneAnd/, async function(next) {
    this.r = await this.findOne()
    next()
})

reviewSchema.post(/^findOneAnd/, async function() {
    await this.r.constructor.calcAvgRatings(this.r.subject)
})

reviewSchema.index({ subject: 1, user: 1}, { unique: true })

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review