"use client";

import React, { useState } from "react";
import DocNav from "@/components/DocNavbar";
import Footer from "@/components/UserFooter";
import Link from "next/link";

const upcomingAppointments = [
  {
    id: 1,
    patient: "Sita Devi",
    date: "2025-04-10",
    time: "10:30 AM",
    department: "Cardiology",
  },
  {
    id: 2,
    patient: "Raj Gupta",
    date: "2025-04-12",
    time: "02:00 PM",
    department: "Dermatology",
  },
  {
    id: 3,
    patient: "Avi Singh",
    date: "2025-04-15",
    time: "09:00 AM",
    department: "Orthopedics",
  },
];

const ongoingAppointments = [
  {
    id: 101,
    patient: "John Doe",
    date: "2025-04-06",
    time: "03:00 PM",
    department: "General Medicine",
  },
  {
    id: 102,
    patient: "Meena Kumari",
    date: "2025-04-07",
    time: "11:00 AM",
    department: "Pediatrics",
  },
];

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState("ongoing");

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100">
      <DocNav />

      <div className="px-4 py-10 max-w-screen">
        {/* Responsive Tab Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 w-full justify-start">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base ${
              activeTab === "ongoing"
                ? "bg-purple-700 text-white"
                : "bg-purple-200 text-purple-800"
            }`}
          >
            Ongoing Appointments
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base ${
              activeTab === "upcoming"
                ? "bg-purple-700 text-white"
                : "bg-purple-200 text-purple-800"
            }`}
          >
            Upcoming Appointments
          </button>
        </div>

        {/* Ongoing Appointments */}
        {activeTab === "ongoing" && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ongoing Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white dark:bg-purple-900 p-5 rounded-xl shadow"
                >
                  <h4 className="text-xl font-semibold mb-2">{appt.patient}</h4>
                  <p className="mb-1">Date: {appt.date}</p>
                  <p className="mb-1">Time: {appt.time}</p>
                  <p className="mb-3">Department: {appt.department}</p>
                  <Link
                    href={`/doctor/appointments/${appt.id}`}
                    className="inline-block bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Upcoming Appointments */}
        {activeTab === "upcoming" && (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Upcoming Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white dark:bg-purple-900 p-5 rounded-xl shadow"
                >
                  <h4 className="text-xl font-semibold mb-2">{appt.patient}</h4>
                  <p className="mb-1">Date: {appt.date}</p>
                  <p className="mb-1">Time: {appt.time}</p>
                  <p className="mb-1">Department: {appt.department}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
