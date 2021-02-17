import axios from 'axios'

const url = 'http://localhost:5000/api/'

export default {
    deleteSubject(id) {
        return axios
            .delete(`${url}subjects/${id}`)
            .then(response => response.data)
    },
    getTutors() {
        return axios
            .get(url + 'users/tutors')
            .then(response => response.data.data.tutors)
    },
    getUsers() {
        return axios
            .get(url + 'users')
            .then(response => response.data.data.data)
    },
    deleteUser(id) {
        return axios
            .delete(`${url}users/${id}`)
            .then(response => response.data)
    },
    updateSubject(id, data) {
        return axios
            .patch(`${url}subjects/${id}`, data)
            .then(response => response.data)
    },
    updateUser(id, data) {
        return axios
            .patch(`${url}users/${id}`, data)
            .then(response => response.data)
    },
    getReviews() {
        return axios
            .get(url + 'reviews')
            .then(response => response.data.data.data)
    },
    deleteReview(id) {
        return axios
            .delete(`${url}reviews/${id}`)
            .then(response => response.data)
    },
    getSubject(id) {
        return axios
            .get(`${url}subjects/${id}`)
            .then(response => response.data.data.data)
    },
    getUser(id) {
        return axios
            .get(`${url}users/${id}`)
            .then(response => response.data.data.data)
    },
    getSubjectReviews(id) {
        return axios
            .get(`${url}subjects/${id}/reviews`)
            .then(response => response.data.data.data)
    },
    createSubject(data) {
        return axios
            .post(`${url}subjects/`, data)
            .then(response => response.data)
    }
}