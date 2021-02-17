import asyncHandler from '../js/asyncHandler'
import ErrorHandler from '../js/errorHandler'
import generic from './genericMiddleware'
import User from './../schemas/userSchema'
import Subject from './../schemas/subjectSchema'
import Payment from './../schemas/paymentSchema'
import Review from './../schemas/reviewSchema'
import multer from 'multer'
import sharp from 'sharp'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import mongoose from 'mongoose'
import crypto from 'crypto'
import path from 'path'
import dotenv from 'dotenv'
import conn from '../server.js'

dotenv.config({ path: './config.env' })

exports.getUsers = generic.getDocs(User)
exports.getUser = generic.getDoc(User)
exports.createUser = generic.createDoc(User)
exports.updateUser = generic.updateDoc(User)
exports.deleteUser = generic.deleteDoc(User)

exports.updateMe = asyncHandler(async (req, res, next) => {
    if (req.body.password || req.body.passwordConfirm) {
        return next(new ErrorHandler('Not allowed', 400))
    }
    
    const updateBody = updateFilter(req.body, 'name', 'email')
    if (req.file) updateBody.photo = req.file.filename
    const user = await User.findByIdAndUpdate(req.user.id, updateBody, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.deleteMe = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })
    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
}

const storage = new GridFsStorage({
    url: process.env.DATABASE.replace(
        '<password>',
        process.env.DATABASE_PASSWORD
    ),
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

exports.allFiles = async (req, res) => {
    let gfs = Grid((await conn).connection.db, mongoose.mongo);
    gfs.collection('uploads');

    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        // Files exist
        return res.json(files);
    });
}

exports.displayImage =  async (req, res) => {
    let gfs = Grid((await conn).connection.db, mongoose.mongo);
    gfs.collection('uploads');

    gfs.files.findOne({ filename: req.params.id }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
}

const filter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true)
    else cb(new ErrorHandler('Not an image', 400), false)
}

const upload = multer({
    storage: storage,
    fileFilter: filter
})

exports.uploadPhoto = upload.single('photo')
    

exports.resizePhoto = (req, res, next) => {
    if (!req.file) return next()
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`
    sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../frontend/public/img/users/${req.file.filename}`)
    next()
}

const updateFilter = (body, ...fields) => {
    const filtered =  {}
    Object.keys(body).forEach(field => {
        if (fields.includes(field)) filtered[field] = body[field]
    })
    return filtered
}

exports.getMySubjects = asyncHandler(async (req, res, next) => {
    const payments = await Payment.find({ user: req.user.id })
    const subjectIDs = payments.map(el => el.subject)
    const subjects = await Subject.find({ _id: { $in: subjectIDs }})
    res.status(200).json({
        status: 'success',
        data: {
            subjects
        }
    })
})

exports.getMyReviews = asyncHandler(async (req, res, next) => {
    const reviews = await Review.find({ user: req.user.id })
    res.status(200).json({
        status: 'success',
        data: {
            reviews
        }
    })
})

exports.getTutors = asyncHandler(async (req, res, next) => {
    const tutors = await User.find({ role: { $ne: 'user' }})
    res.status(200).json({
        status: 'success',
        data: {
            tutors
        }
    })
})