import asyncHandler from '../js/asyncHandler'
import ErrorHandler from '../js/errorHandler'
import QueryHandler from '../js/queryHandler'

exports.getDocs = Model => asyncHandler(async (req, res, next) => {
    let filter = {}
    if (req.params.subjectId) filter = { subject: req.params.subjectId }
    const handler = new QueryHandler(Model.find(filter), req.query)
        .filter()
        .sort()
        .limit()
        .paginate()
    const doc = await handler.query
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    })
})

exports.getDoc = (Model, populateOptions) => asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id)
    if (populateOptions) query = query.populate(populateOptions)
    const doc = await query
    if (!doc) {
        return next(new ErrorHandler(`Document doesn't exist`), 404)
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.createDoc = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.updateDoc = Model => asyncHandler(async (req, res, next) => {
    if (req.file) req.body.photo = req.file.filename
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidator: true
    })
    if (!doc) {
        return next(new ErrorHandler(`Document doesn't exist`), 404)
    }
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})

exports.deleteDoc = Model => asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id)
    if (!doc) {
        return next(new ErrorHandler(`Document doesn't exist`), 404)
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
})


