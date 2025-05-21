// /api/appointments/user-upcoming (GET)
import Appointment from "@/models/meetingModel";
import connectDB from "@/lib/db";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const appointmentId = searchParams.get("appointmentId");

    if (!appointmentId) {
      return new Response(JSON.stringify({ error: "Missing appoinmentId" }), {
        status: 400,
      });
    }

    const upcomingAppointment = await Appointment.findOne({
      appointmentId
    }).select("meetingLink");
    if (!upcomingAppointment) {
      console.error("No upcoming appointment found");
      return new Response(
        JSON.stringify({ error: "No upcoming appointment found" }),
        {
          status: 404,
        }
      );
    }

    return Response.json({
      meetingLink: upcomingAppointment?.meetingLink || null,
    });
  } catch (err) {
    console.error("Error fetching appointment:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
