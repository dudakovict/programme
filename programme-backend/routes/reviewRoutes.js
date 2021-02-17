import express from 'express'
import reviewMiddleware from './../middleware/reviewMiddleware'
import authenticationMiddleware from './../middleware/authenticationMiddleware'

const router = express.Router({ mergeParams: true })

router.use(authenticationMiddleware.protect)

router
    .route('/')
    .get(reviewMiddleware.getReviews)
    .post(reviewMiddleware.setIDs, reviewMiddleware.createReview)

router
    .route('/:id')
    .get(reviewMiddleware.getReview)
    .patch(reviewMiddleware.updateReview)
    .delete(reviewMiddleware.deleteReview)

module.exports = router