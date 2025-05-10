import axios from 'axios'

const api = axios.create({
  baseURL: 'https://681507e7225ff1af162aeb7e.mockapi.io/api/v1'
})

// Interceptor para manejar errores globales
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error de API:', error.response?.data || error.message)
    alert('Hubo un error. Inténtalo nuevamente.')
    return Promise.reject(error)
  }
)

export default api
