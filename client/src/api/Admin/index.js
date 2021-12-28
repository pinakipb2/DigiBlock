import axios from 'axios';

const adminAPI = axios.create({
  baseURL: 'http://localhost:5000/api/admin/',
});

export const fetchMasterKey = () => adminAPI.post('/gen-master-key');
export const sendMasterKey = (name, address, email, masterKey) => adminAPI.post('/send-master-key', { name, address, email, masterKey });
export const validateMasterKey = (masterKey, masterKeyHash) => adminAPI.post('/validate-master-key', { masterKey, masterKeyHash });
export const verify = (address) => adminAPI.post('/verify', { address });
export const isVerified = (address) => adminAPI.post('/is-verified', { address });
export const remove = (address) => adminAPI.post('/remove', { address });
