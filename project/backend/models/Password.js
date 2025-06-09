import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Store encrypted password
  },
  notes: {
    type: String,
    default: '',
  }
}, { timestamps: true });

export default mongoose.model('Password', passwordSchema);
