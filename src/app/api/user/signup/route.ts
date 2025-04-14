import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import connectDB from "@/dbConfig/dbConfig";

export async function POST(request: NextRequest){
  try {
    await connectDB();
  
    const { email, password, username } = await request.json();

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if(userExist) return NextResponse.json({ message: "User already exists",user:userExist }, { status: 400 });
  
    const user = await User.create({
      email,
      password,
      username
    });
  
    console.log('user created', user);
  
    return NextResponse.json(user, { status: 200 });

  } catch (error) {
      console.log('Error creating user:', error);
      return NextResponse.json(error, { status: 500 });
  }
}