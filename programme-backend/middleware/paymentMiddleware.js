const asyncHandler = require('../js/asyncHandler')
const generic = require('./genericMiddleware')
const Payment = require('../schemas/paymentSchema')
const Subject = require('../schemas/subjectSchema')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getPayments = generic.getDocs(Payment)
exports.getPayment = generic.getDoc(Payment)
exports.createPayment = generic.createDoc(Payment)
exports.updatePayment = generic.updateDoc(Payment)
exports.deletePayment = generic.deleteDoc(Payment)

exports.createPaymentCheckout = asyncHandler(async (req, res, next) => {
    const { subject, user, price } = req.query
    if (!subject || !user || !price) return next()
    await Payment.create({ subject, user, price })
    res.redirect(`${req.protocol}://localhost:8080/`)
})

exports.getCheckoutSession = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findById(req.params.subjectId)
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://localhost:5000/api/payments/createPayment/?subject=${
            req.params.subjectId
            }&user=${req.user.id}&price=${subject.price}`,
        cancel_url: `${req.protocol}://http://localhost:8080/subject/${subject.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.subjectId,
        line_items: [
            {
                name: `${subject.name} subject`,
                description: subject.description,
                images: ['https://www.montanabranding.com/wp-content/uploads/2017/04/montana-custom-website-development-web-developer-agency.jpg.png'],
                amount: subject.price * 100,
                currency: 'usd',
                quantity: 1
            }
        ]
    })
    res.status(200).json({
        status: 'success',
        data: {
            session
        }
    })
})
