import CryptoJS from "crypto-js";

export const encryptText = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

export const decryptText = (ciphertext, key) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};
