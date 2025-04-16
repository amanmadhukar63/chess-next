import { NextResponse } from "next/server";

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
  WARN = "warn"
}

export default function responseHandler( statusCode: number, message: string, status: ResponseStatus, data?: any, ) {
  return NextResponse.json({
    message,
    data,
    statusCode,
    status
  }, { status: statusCode });
}