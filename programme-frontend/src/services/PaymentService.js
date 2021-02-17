import axios from 'axios'

const url = 'http://localhost:5000/api/payments/'

export default {
    payment(subjectId) {
        return axios
            .get(url + `checkout/${subjectId}`)
            .then(response => response.data)
    }
}