import axios from 'axios'

/**
 * Axios instance configured for DoctorHub API
 * Base URL: http://localhost:3002/api (NestJS backend)
 * Includes credentials in requests
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:3002/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default apiClient
