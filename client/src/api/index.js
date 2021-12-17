import axios from 'axios';

const adminAPI = axios.create({
  baseURL: 'http://localhost:5000/api/admin/',
});

export const fetchMasterKey = (name, email) => adminAPI.post('/gen-master-key', { name, email });

export const fetchasterKey = () => adminAPI.get('/gen-master-key');
