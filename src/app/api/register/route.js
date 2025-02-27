import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { firstName, lastName, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ 
      firstName,  
      lastName, 
      email, 
      password: hashedPassword,
      picture: null,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log("Registration error:", error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
