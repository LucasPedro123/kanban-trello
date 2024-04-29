import axios from 'axios';

// Configuração básica do axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;