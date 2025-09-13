import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.error || error.message || 'Request failed'
    return Promise.reject(new Error(message))
  }
)


