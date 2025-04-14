import { NextResponse } from "next/server";

export default function responseHandler( statusCode: number, message: string, data?: any, ) {
  return NextResponse.json({
    message,
    data,
    statusCode
  }, { status: statusCode });
}