import { getToken } from "next-auth/jwt"; 
import Appointment from "@/models/meetingModel";
import connectDB from "@/lib/db";

export async function GET(req) {
  try {
    await connectDB();
    const token = await getToken({ req });

    if (!token || !token.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const upcomingAppointment = await Appointment.findOne({
      patientId: token.id,
      meetingLink: { $exists: true, $ne: null },
      date: { $gte: new Date() },
    })
      .sort({ date: 1 }) 
      .select("meetingLink");

    return Response.json({ meetingLink: upcomingAppointment?.meetingLink || null });
  } catch (err) {
    console.error("Error fetching appointment:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
