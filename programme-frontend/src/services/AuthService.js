import axios from 'axios'

const url = 'http://localhost:5000/api/users/'

export default {
    login(credentials) {
        return axios
            .post(url + 'login/', credentials)
            .then(response => response.data)
    },
    signup(credentials) {
        return axios
            .post(url + 'signup/', credentials)
            .then(response => response.data)
    }
}