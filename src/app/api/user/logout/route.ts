import { NextRequest, NextResponse } from "next/server";
import responseHandler, { ResponseStatus } from "@/helper/response";

export async function GET(request: NextRequest){
  try {

    const response = NextResponse.json({
      message: "User logged out successfully",
      statusCode: 200,
      status: ResponseStatus.SUCCESS
    }, { status: 200 });
    
    // deleting the token from cookie
    response.cookies.delete("token");

    return response;

  } catch (error) {

    console.log('Error logging in user:', error);
    return responseHandler(500, "Internal server error", ResponseStatus.ERROR, error);
  }

}