import axios from 'axios';

import BASEURL from '../config';

const issuerAPI = axios.create({
  baseURL: `${BASEURL}/issuer/`,
});

export const genIssuerMasterKey = () => issuerAPI.get('/generate-master-key');
export const validateMasterKey = (masterKey, masterKeyHash) => issuerAPI.post('/validate-master-key', { masterKey, masterKeyHash });
export const addIssuer = (orgName, address, docType) => issuerAPI.post('/add-issuer', { orgName, address, docType });
export const allIssuers = () => issuerAPI.get('/all-issuers');
export const sendIssuerMasterKey = (name, email, masterKey) => issuerAPI.post('/send-master-key', { name, email, masterKey });
