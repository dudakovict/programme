const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Subject = require('../schemas/subjectSchema')
const User = require('../schemas/userSchema')
const Review = require('../schemas/reviewSchema')
const Payment = require('../schemas/paymentSchema')

dotenv.config({ path: './config.env' })

const db = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to DB'))

const subjects = JSON.parse(fs.readFileSync(`${__dirname}/subjects.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'))
const payments = JSON.parse(fs.readFileSync(`${__dirname}/payments.json`, 'utf-8'))

const loadToDB = async () => {
    try {
        await Subject.create(subjects);
        await User.create(users, { validateBeforeSave: false })
        await Review.create(reviews)
        await Payment.create(payments)
        console.log('Success!')
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

const deleteFromDB = async () => {
    try {
        await Subject.deleteMany()
        await User.deleteMany()
        await Review.deleteMany()
        await Payment.deleteMany()
        console.log('Success!')
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === '--load') loadToDB()
else if (process.argv[2] === '--delete') deleteFromDB()