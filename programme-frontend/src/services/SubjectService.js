import axios from 'axios'

const url = 'http://localhost:5000/api/subjects/'

export default {
    getAllSubjects() {
        return axios
            .get(url)
            .then(response => response.data.data.data)
    },
    getBySlug(slug) {
        return axios
            .get(url + `subject/${slug}`)
            .then(response => response.data.data.subject)
    }
}