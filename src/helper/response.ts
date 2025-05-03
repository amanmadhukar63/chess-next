import { NextResponse } from "next/server";

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARN = "warn"
}

export default function responseHandler<T>( statusCode: number, message: string, status: ResponseStatus, data?: T, cookie?: { name: string, value: string }) {
  const response = NextResponse.json({
    message,
    data,
    statusCode,
    status
  }, { status: statusCode });

  if(cookie) response.cookies.set(cookie?.name, cookie?.value, { httpOnly: true });

  return response;
}