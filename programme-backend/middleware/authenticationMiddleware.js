import asyncHandler from '../js/asyncHandler'
import ErrorHandler from '../js/errorHandler'
import User from '../schemas/userSchema'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

exports.signup = asyncHandler(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    tokenCreation(user, 201, res)
})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler('Email and password are required', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.isCorrectPassword(password, user.password))) {
        return next(new ErrorHandler('Email or password are incorrect', 401))
    }
    tokenCreation(user, 200, res)
})

exports.restrict = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler('Unauthorized', 403))
        }
        next()
    }
}

exports.protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return next(new ErrorHandler('You are not logged in', 401))
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
        return next(new ErrorHandler('User no longer exists', 401))
    }
    if (user.hasChangedPassword(decoded.iat)) {
        return next(new ErrorHandler('Password changed, log in again.', 401))
    }
    req.user = user
    next()
})

exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    if (!(await user.isCorrectPassword(req.body.passwordCurrent, user.password))) {
        return next(new ErrorHandler('Current password is wrong'), 401)
    }
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()
    tokenCreation(user, 200, res)
})

const tokenSignature = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const tokenCreation = (user, statusCode, res) => {
    const token = tokenSignature(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.cookie('jwt', token, cookieOptions)
    user.password = undefined
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}