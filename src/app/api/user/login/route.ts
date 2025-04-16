import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import connectDB from "@/dbConfig/dbConfig";
import responseHandler, { ResponseStatus } from "@/helper/response";
import { NullableUserType } from "@/helper/types";

export async function POST(request: NextRequest){
try {
  // db connection
  await connectDB();

  const { email, password } = await request.json();

  // Validate request body
  if(!email || !password){
    return responseHandler(400, "Please fill all the fields", ResponseStatus.WARN);
  }
  // Check if user does't exists
  const userExist:NullableUserType = await User.findOne({ email });
  if(!userExist){
    return responseHandler(400, "User with this email id does not exists, Try to signup", ResponseStatus.WARN);
  }

  // Check if password is correct
  console.log('userExist', userExist);
  const isPasswordCorrect = await userExist.comparePassword(password);
  if(!isPasswordCorrect){
    return responseHandler(400, "Incorrect password", ResponseStatus.WARN);
  }

  // remove the password from the user object
  delete userExist.password;
  delete userExist.otp;
  
  return responseHandler(200, "User logged in successfully", ResponseStatus.SUCCESS, userExist);

} catch (error) {

  console.log('Error logging in user:', error);
  return responseHandler(500, "Internal server error", ResponseStatus.ERROR, error);
}

}