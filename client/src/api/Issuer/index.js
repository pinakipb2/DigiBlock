import axios from 'axios';

const issuerAPI = axios.create({
  baseURL: 'http://localhost:5000/api/v1/issuer/',
});

export const validateMasterKey = (masterKey, masterKeyHash) => issuerAPI.post('/validate-master-key', { masterKey, masterKeyHash });

export const addIssuer = (orgName, address, docType) => issuerAPI.post('/add-issuer', { orgName, address, docType });

export const allIssuers = () => issuerAPI.get('/all-issuers');
