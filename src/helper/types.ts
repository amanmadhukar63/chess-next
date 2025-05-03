import { Document } from "mongoose";

export interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  role: string;
  isVerified: boolean;
  otp?: string;
  comparePassword(password: string): Promise<boolean>;
}

export type NullableUserType = UserType | null;