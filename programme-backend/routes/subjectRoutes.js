import express from 'express'
import subjectMiddleware from './../middleware/subjectMiddleware'
import reviewRouter from './../routes/reviewRoutes'

const router = express.Router()

router.use('/:subjectId/reviews', reviewRouter)
router.get('/subject/:slug', subjectMiddleware.getBySlug)

router.get('/files', subjectMiddleware.allFiles)
router.get('/files/:id', subjectMiddleware.displayImage)

router
    .route('/')
    .get(subjectMiddleware.getSubjects)
    .post(subjectMiddleware.uploadPhoto, subjectMiddleware.createSubject)

router
    .route('/:id')
    .get(subjectMiddleware.getSubject)
    .patch(subjectMiddleware.uploadPhoto, subjectMiddleware.updateSubject)
    .delete(subjectMiddleware.deleteSubject)

module.exports = router