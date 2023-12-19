import axios from 'axios'
axios.interceptors.request.use(
  config => {
      config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)