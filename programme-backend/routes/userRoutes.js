import express from 'express'
import userMiddleware from './../middleware/userMiddleware'
import authenticationMiddleware from './../middleware/authenticationMiddleware'

const router = express.Router()

router.post('/signup', authenticationMiddleware.signup)
router.post('/login', authenticationMiddleware.login)

router.get('/files', userMiddleware.allFiles)
router.get('/files/:id', userMiddleware.displayImage)

router.use(authenticationMiddleware.protect)

router.get('/me', userMiddleware.getMe, userMiddleware.getUser)
router.patch('/updateMe', userMiddleware.uploadPhoto, userMiddleware.updateMe)
router.patch('/updateMyPassword', authenticationMiddleware.updatePassword)
router.patch('/deleteMe', userMiddleware.deleteMe)

router.get('/mySubjects', userMiddleware.getMySubjects)
router.get('/myReviews', userMiddleware.getMyReviews)
router.get('/tutors', userMiddleware.getTutors)

router
    .route('/')
    .get(userMiddleware.getUsers)
    .post(userMiddleware.createUser)

router
    .route('/:id')
    .get(userMiddleware.getUser)
    .patch(userMiddleware.updateUser)
    .delete(userMiddleware.deleteUser)


    
module.exports = router