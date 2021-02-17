const express = require('express')
const Subject = require('./../schemas/subjectSchema')
const reviewMiddleware = require('./../middleware/reviewMiddleware')
const authenticationMiddleware = require('./../middleware/authenticationMiddleware')
const paymentMiddleware = require('./../middleware/paymentMiddleware')

const router = express.Router()

router.get('/checkout/:subjectId', authenticationMiddleware.protect, paymentMiddleware.getCheckoutSession)
router.get('/createPayment', paymentMiddleware.createPaymentCheckout)
//router.use(authenticationMiddleware.restrict('admin'))

router
    .route('/')
    .get(paymentMiddleware.getPayments)
    .post(paymentMiddleware.createPayment)

router
    .route('/:id')
    .get(paymentMiddleware.getPayment)
    .patch(paymentMiddleware.updatePayment)
    .delete(paymentMiddleware.deletePayment)

module.exports = router