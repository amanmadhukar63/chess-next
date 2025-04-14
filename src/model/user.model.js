import { Schema, models, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: 'Guest'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'USER'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  }
});

const User = models.users || model('users', userSchema);
export default User;