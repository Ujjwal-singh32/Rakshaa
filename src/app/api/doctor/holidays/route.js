// app/api/doctor/holidays/route.js

import { NextResponse } from "next/server";

export async function GET() {
  // You can make this dynamic from DB later
  const holidays = ["2025-04-14", "2025-04-25", "2025-05-01"];
  return NextResponse.json({ success: true, holidays });
}
