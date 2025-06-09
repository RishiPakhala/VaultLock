import CryptoJS from 'crypto-js';

const FRONTEND_SECRET = 'frontend-encryption-key'; // not very secure on frontend

export const encrypt = (text) => CryptoJS.AES.encrypt(text, FRONTEND_SECRET).toString();

export const decrypt = (cipherText) =>
  CryptoJS.AES.decrypt(cipherText, FRONTEND_SECRET).toString(CryptoJS.enc.Utf8);
