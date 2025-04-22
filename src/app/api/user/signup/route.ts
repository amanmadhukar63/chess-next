import { NextRequest } from "next/server";
import User from "@/model/user.model";
import connectDB from "@/dbConfig/dbConfig";
import responseHandler, { ResponseStatus } from "@/helper/response";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
  try {
    await connectDB();
  
    const { email, password, username } = await request.json();

    // Validate request body
    if(!email || !password || !username){
      return responseHandler(400, "Please fill all the fields", ResponseStatus.WARN);
    };

    // Check if user already exists
    const userExist = await User.exists({ email });
    if(userExist){
      return responseHandler(400, "User with this email id already exists, Try to login", ResponseStatus.WARN);
    };
  
    // Create new user
    const user = await User.create({
      email,
      password,
      username
    });

    // remove the password from the user object
    delete user.password;
    delete user.otp;
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
    return responseHandler(201, "User created successfully", ResponseStatus.SUCCESS, user, { name: "token", value: token });

  } catch (error) {
      console.log('Error creating user:', error);
      return responseHandler(500, "Internal server error", ResponseStatus.ERROR, error);
  }
}