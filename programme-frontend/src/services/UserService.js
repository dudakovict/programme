import axios from 'axios'

const url = 'http://localhost:5000/api/users/'

export default {
    updateData(data) {
        return axios
            .patch(url + 'updateMe/', data)
            .then(response => response.data)
    },
    updatePassword(credentials) {
        return axios
            .patch(url + 'updateMyPassword/', credentials)
            .then(response => response.data)
    },
    myReviews(user) {
        return axios
            .get(url + 'myReviews/', user)
            .then(response => response.data.data.reviews)
    },
    mySubjects(user) {
        return axios
            .get(url + 'mySubjects/', user)
            .then(response => response.data.data.subjects)
    },
    deleteMe(user) {
        return axios
            .patch(url + 'deleteMe/', user)
            .then(response => response.data)
    }
}