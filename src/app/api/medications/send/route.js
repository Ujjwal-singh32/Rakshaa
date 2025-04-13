// app/api/medications/send/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Medication from '@/models/medicationModel';

export async function POST(req) {
  const body = await req.json();
  const { patientId, medications } = body;

  try {
    await connectDB();
    await Medication.create({ patientId, medications, date: new Date() });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
