import { Schema, models, model } from 'mongoose';
import { UserType } from '@/helper/types';
import bcrypt from 'bcrypt';

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

// Hash password before saving user
userSchema.pre<UserType>('save', async function (next) {
  if (this.isModified('password')){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
}

const User = models.users || model<UserType>('users', userSchema);
export default User;