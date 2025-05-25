// /app/api/doctor/appointments/route.js (or similar)

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import DoctorBooking from "@/models/doctorBookingModel";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get("doctorId");

  if (!doctorId) {
    return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
  }

  try {
    const appointments = await DoctorBooking.find({
      doctorId,
      status: "completed",
    })
      .sort({ date: -1 })
      .limit(5)
      .populate("patientId", "name"); 

    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
