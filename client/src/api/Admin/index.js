import axios from 'axios';

const adminAPI = axios.create({
  baseURL: 'http://localhost:5000/api/v1/admin/',
});

export const genMasterKey = () => adminAPI.post('/gen-master-key');
export const sendMasterKey = (name, address, email, masterKey) => adminAPI.post('/send-master-key', { name, address, email, masterKey });
export const validateMasterKey = (masterKey, masterKeyHash) => adminAPI.post('/validate-master-key', { masterKey, masterKeyHash });
export const verify = (address) => adminAPI.post('/verify', { address });
export const isVerified = (address) => adminAPI.post('/is-verified', { address });
export const remove = (address) => adminAPI.post('/remove', { address });

export const genIssuerMasterKey = () => adminAPI.post('/gen-issuer-master-key');
export const sendIssuerMasterKey = (name, email, masterKey) => adminAPI.post('/send-issuer-master-key', { name, email, masterKey });
