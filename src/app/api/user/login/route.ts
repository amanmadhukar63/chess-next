import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";


export async function GET(request: NextRequest){
  // const { email, password } = await request.json();
  // const user = User.findOne({ email, password });

  console.log('Get Request',request);
  return NextResponse.json({ message: "Hello World Get" }, { status: 200 });
}

export async function POST(request: NextRequest){
  // const { email, password } = await request.json();
  // const user = User.findOne({ email, password });

  console.log('Post Request',request);
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}