import axios from 'axios';

const adminAPI = axios.create({
  baseURL: 'http://localhost:5000/api/v1/admin/',
});

export const genMasterKey = () => adminAPI.get('/generate-master-key');
export const sendMasterKey = (name, email, masterKey) => adminAPI.post('/send-master-key', { name, email, masterKey });
export const validateMasterKey = (masterKey, masterKeyHash) => adminAPI.post('/validate-master-key', { masterKey, masterKeyHash });
export const verify = (address) => adminAPI.post('/verify', { address });
export const isVerified = (address) => adminAPI.post('/is-verified', { address });
export const remove = (address) => adminAPI.post('/remove', { address });
export const add = (address) => adminAPI.post('/add-admin', { address });
