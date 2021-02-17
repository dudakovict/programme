import Review from './../schemas/reviewSchema'
import generic from './genericMiddleware'

exports.getReviews = generic.getDocs(Review)
exports.getReview = generic.getDoc(Review)
exports.createReview = generic.createDoc(Review)
exports.updateReview = generic.updateDoc(Review)
exports.deleteReview = generic.deleteDoc(Review)

exports.setIDs = (req, res, next) => {
    if (!req.body.subject) req.body.subject = req.params.subjectId
    if (!req.body.user) req.body.user = req.user.id
    next()
}