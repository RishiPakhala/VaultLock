import Password from '../models/Password.js';
import CryptoJS from 'crypto-js';

// Encrypt the password
const encrypt = (text) => {
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) throw new Error("JWT_SECRET is not set!");
  return CryptoJS.AES.encrypt(text, SECRET).toString();
};
// Decrypt the password
const decrypt = (hash) => {
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) throw new Error("JWT_SECRET is not set!");
  return CryptoJS.AES.decrypt(hash, SECRET).toString(CryptoJS.enc.Utf8);
};

// Create a new password entry
export const addPassword = async (req, res) => {
  try {
    const { website, username, password, notes } = req.body;
    const encryptedPassword = encrypt(password);

    const newEntry = new Password({
      user: req.user.userId,
      website,
      username,
      password: encryptedPassword,
      notes,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Password saved successfully' });
  } catch (err) {
    console.error("Error in addPassword:", err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all passwords for the user
export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.userId });
    const decrypted = passwords.map(entry => ({
      ...entry._doc,
      password: decrypt(entry.password),
    }));
    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
};

// Update a password entry
export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { website, username, password, notes } = req.body;

  try {
    const encryptedPassword = encrypt(password);

    const updated = await Password.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { website, username, password: encryptedPassword, notes },
      { new: true }
    );

    res.json({ message: 'Password updated', updated });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};

// Delete a password entry
export const deletePassword = async (req, res) => {
  const { id } = req.params;

  try {
    await Password.findOneAndDelete({ _id: id, user: req.user.userId });
    res.json({ message: 'Password deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

