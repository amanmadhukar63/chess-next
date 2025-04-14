import { NextRequest } from "next/server";
import User from "@/model/user.model";
import connectDB from "@/dbConfig/dbConfig";
import responseHandler from "@/helper/response";

export async function POST(request: NextRequest){
  try {
    await connectDB();
  
    const { email, password, username } = await request.json();

    // Validate request body
    if(!email || !password || !username){
      return responseHandler(400, "Please fill all the fields");
    };

    // Check if user already exists
    const userExist = await User.exists({ email });
    if(userExist){
      return responseHandler(400, "User with this email id already exists, Try to login");
    };
  
    // Create new user
    const user = await User.create({
      email,
      password,
      username
    });
    return responseHandler(201, "User created successfully", user);

  } catch (error) {
      console.log('Error creating user:', error);
      return responseHandler(500, "Internal server error", error);
  }
}