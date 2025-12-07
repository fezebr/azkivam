import axios from 'axios'

//TODO: definetly we should move this config to a .env file
export const API_VERSION = 'v1'
export const API_BASE_URL = `https://interview-api.azkivam.com/api/${API_VERSION}`

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
})
