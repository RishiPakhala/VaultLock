import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Password from '../models/Password.js';


const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });


    const newUser = await User.create({
      fullName,
      email,
      password
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      token,
      user: { id: user._id, fullName: user.fullName, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // Delete all passwords associated with the user
    await Password.deleteMany({ user: req.user.userId });
    
    // Delete the user account
    await User.findByIdAndDelete(req.user.userId);
    
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete account', error: err.message });
  }
};

export { register, login, deleteAccount };
