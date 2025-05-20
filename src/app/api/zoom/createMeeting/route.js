import Appointment from "@/models/meetingModel";
import { createZoomMeeting } from "@/utils/zoom";

export async function POST(req) {
  try {
    const {doctorId, patientId, doctorName, patientName, date, duration, appointmentId } = await req.json();

    if (!doctorName || !patientName || !date || !duration || !appointmentId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const topic = `Consultation: Dr. ${doctorName} with ${patientName}`;
    const startTime = date;

    // Call Zoom API
    const zoomRes = await createZoomMeeting({
      topic,
      startTime,
      duration,
    });
    console.log("appoinmentId:" ,appointmentId)
    // Update appointment with Zoom meeting info
   await Appointment.create({
  doctorId,            // Required
  patientId,           // Required
  date,                
  status: "scheduled", 
  meetingLink: zoomRes.join_url,
  meetingCreatedAt: new Date(),
});

    return Response.json({ success: true, join_url: zoomRes.join_url });
  } catch (err) {
    console.error("Zoom Meeting Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


