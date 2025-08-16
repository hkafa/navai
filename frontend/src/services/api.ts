// api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Minimal auth header injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    // headers can be undefined — guard it
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
