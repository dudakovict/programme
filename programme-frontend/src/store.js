import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const getDefaultState = () => {
    return {
        token: '',
        user: {}
    }
}

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isLoggedIn: state => {
            return state.token
        },
        getUser: state => {
            return state.user
        },
        isAdmin: state => {
            return state.user.role === 'admin'
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        UPDATE_USER: (state, user) => {
            state.user = user
        },
        UPDATE_TOKEN: (state, token) => {
            state.token = token
        },
        RESET: state => {
            Object.assign(state, getDefaultState())
        }
    },
    actions: {
        login: ({ commit, dispatch }, { token, user }) => {
            commit('SET_TOKEN', token)
            commit('SET_USER', user)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        },
        logout: ({ commit, dispatch }) => {
            commit('RESET', '')
            delete axios.defaults.headers.common['Authorization']
        },
        updateUser: ({ commit, dispatch }, user) => {
            commit('UPDATE_USER', user)
        },
        updatePassword: ({ commit, dispatch }, token) => {
            commit('UPDATE_TOKEN', token)
        } 
    }
})