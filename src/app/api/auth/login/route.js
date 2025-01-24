import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import AuthService from "@/app/api/services/authService";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Make sure to set this in .env

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find or create user
    let { user } = await AuthService.login(email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate JWT token
    const token = jwt.sign(user.toJson(), JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
