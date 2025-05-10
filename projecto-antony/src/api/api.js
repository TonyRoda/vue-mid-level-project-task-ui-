import axios from 'axios'

const api = axios.create({
  baseURL: 'https://681507e7225ff1af162aeb7e.mockapi.io/api/v1'
})

// Puedes añadir un interceptor para manejar errores globales
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error de API:', error)
    alert('Ocurrió un error con la API.')
    return Promise.reject(error)
  }
)

export default api
