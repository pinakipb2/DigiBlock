import axios from 'axios';

const adminAPI = axios.create({
  baseURL: 'http://localhost:5000/api/admin/',
});

export const fetchMasterKey = (name, address, email) => adminAPI.post('/gen-master-key', { name, address, email });

export const fetchasterKey = () => adminAPI.get('/gen-master-key');
