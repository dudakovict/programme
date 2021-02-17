import express from 'express'
import expressRateLimit from 'express-rate-limit'
import helmet from 'helmet'
import xssClean from 'xss-clean'
import cookieParser from 'cookie-parser'
import expressMongoSanitize from 'express-mongo-sanitize'
import ErrorHandler from './js/errorHandler'
import errorMiddleware from './middleware/errorMiddleware'
import subjectRouter from './routes/subjectRoutes'
import userRouter from './routes/userRoutes'
import reviewRouter from './routes/reviewRoutes'
import paymentRouter from './routes/paymentRoutes'
import cors from 'cors'

const app = express()
app.use(helmet())
app.use(cors())
const limiter = expressRateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP."
})
app.use('/api', limiter)
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.use(expressMongoSanitize())
app.use(xssClean())
app.use('/api/subjects', subjectRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/payments', paymentRouter)

app.all('*', (req, res, next) => {
    next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(errorMiddleware)
module.exports = app;