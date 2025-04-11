// src/app/api/booking/all/route.js

import connectDB from "@/lib/db";
import bookingModel from "@/models/doctorBookingModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const bookings = await bookingModel.find().sort({ date: -1 }); // latest first
    // console.log("bookings from the backend side" , bookings);
    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching bookings" },
      { status: 500 }
    );
  }
}
