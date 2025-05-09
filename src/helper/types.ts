import { Square } from "chess.js";
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

export interface MovesType {
  playedMoves: PlayedMovesType;
}

export type PlayedMovesType = Array<{move:string,from:Square,to:Square}>;

export type NullableUserType = UserType | null;