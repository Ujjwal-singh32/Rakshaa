import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Doctor from "@/models/doctorModel";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return NextResponse.json({ success: false, message: "Doctor not found" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(doctor._id);

    return NextResponse.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
