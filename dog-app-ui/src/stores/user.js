import { ref } from 'vue'
import { defineStore } from 'pinia'
import _axios from '../plugins/axios'
export const useUser = defineStore('useUser', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')))
    const token = ref(localStorage.getItem('token'))
    const setToken = (access_token) => {
        localStorage.setItem('token', access_token)
        _axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        token.value = access_token
    }
    const setUser = (user_data) => {
        user.value = user_data
        localStorage.setItem('user', JSON.stringify(user_data))
    }

    const hasToken = () => {
        return !!token.value
    }

    const logout = () => {
        localStorage.removeItem('token')
        token.value = ''
        user.value = {}
    }
    return { user, setToken, setUser, hasToken, logout }
})

