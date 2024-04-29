import axios from 'axios';

// Configuração básica do axios
const api = axios.create({
  baseURL: 'https://system-trello-register.onrender.com', // URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;