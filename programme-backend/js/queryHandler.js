class QueryHandler {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    sort() {
        if (this.queryString.sort) {
            const sorted = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sorted)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    limit() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }

    filter() {
        const queryObj = { ...this.queryString }
        const exclude = ['sort', 'limit', 'fields', 'page']
        exclude.forEach(el => delete queryObj[el])
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    paginate() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 100
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

module.exports = QueryHandler