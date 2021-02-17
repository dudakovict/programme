import ErrorHandler from '../js/errorHandler'
import asyncHandler from '../js/asyncHandler'
import generic from './genericMiddleware'
import Subject from './../schemas/subjectSchema'
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

exports.getSubjects = generic.getDocs(Subject)
exports.getSubject = generic.getDoc(Subject, { path: 'reviews' })
exports.createSubject = generic.createDoc(Subject)
exports.updateSubject = generic.updateDoc(Subject)
exports.deleteSubject = generic.deleteDoc(Subject)

exports.getBySlug = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findOne({ slug: req.params.slug }).populate({
            path: 'reviews',
            fields: 'review rating user'
        })
    if (!subject) {
        return next(new ErrorHandler(`Subject doesn't exist`, 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            subject
        }
    })
})

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
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        return res.json(files);
    });
}

exports.displayImage = async (req, res) => {
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

exports.resizePhoto = asyncHandler(async (req, res, next) => {
    if (!req.file) return next()
    req.file.filename = `subject-${req.params.id}-${Date.now()}-cover.jpeg`
    sharp(req.file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../frontend/public/img/subjects/${req.file.filename}`)
    next()
})