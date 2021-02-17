import axios from 'axios'

const url = 'http://localhost:5000/api/reviews/'

export default {
    deleteReview(id) {
        return axios
            .delete(`${url}${id}`)
            .then(response => response.data)
    },
    updateReview(id, data) {
        return axios
            .patch(`${url}${id}`, data)
            .then(response => response.data)
    },
    getReview(id) {
        return axios
            .get(`${url}${id}`)
            .then(response => response.data.data.data)
    },
    postReview(data) {
        return axios
            .post(`${url}`, data)
            .then(response => response.data)
    }
}