import React from "react";
import DocNav from "@/components/DocNavbar";
import Footer from "@/components/UserFooter";


const upcomingAppointments = [
  {
    patient: "Sita Devi",
    date: "2025-04-10",
    time: "10:30 AM",
    department: "Cardiology",
  },
  {
    patient: "raj Gupta",
    date: "2025-04-12",
    time: "02:00 PM",
    department: "Dermatology",
  },
  {
    patient: "avi Singh",
    date: "2025-04-15",
    time: "09:00 AM",
    department: "Orthopedics",
  },
  {
    patient: "Sita ghosh",
    date: "2025-04-10",
    time: "10:30 AM",
    department: "Cardiology",
  },
  {
    patient: "Rahul sharma",
    time: "02:00 PM",
    department: "Dermatology",
  },
  {
    patient: "ankit Singh",
    date: "2025-04-15",
    time: "09:00 AM",
    department: "Orthopedics",
  },
  {
    patient: "rani Devi",
    date: "2025-04-10",
    time: "10:30 AM",
    department: "Cardiology",
  },
  {
    patient: "ravi Gupta",
    date: "2025-04-12",
    time: "02:00 PM",
    department: "Dermatology",
  },
  {
    patient: "Priya rani",
    date: "2025-04-15",
    time: "09:00 AM",
    department: "Orthopedics",
  }
];

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100">
      <DocNav />
      <div className="px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">Upcoming Appointments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingAppointments.map((appt, index) => (
            <div
              key={index}
              className="bg-white dark:bg-purple-900 p-5 rounded-xl shadow"
            >
              <h4 className="text-xl font-semibold mb-2">{appt.patient}</h4>
              <p className="mb-1">Date: {appt.date}</p>
              <p className="mb-1">Time: {appt.time}</p>
              <p className="mb-1">Department: {appt.department}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
