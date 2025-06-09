// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect: 'Bearer <token>'

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user payload to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticateToken;
