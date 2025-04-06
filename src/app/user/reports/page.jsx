"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";

const sampleAppointments = [
  // --- UPCOMING ---
  {
    id: 1,
    patientName: "Rohan Sharma",
    doctorName: "Dr. Mehta",
    disease: "Fever",
    date: "2025-04-10",
    type: "upcoming",
    notifications: 2,
  },
  {
    id: 2,
    patientName: "Priya Verma",
    doctorName: "Dr. Roy",
    disease: "Back Pain",
    date: "2025-04-11",
    type: "upcoming",
    notifications: 1,
  },
  {
    id: 3,
    patientName: "Aman Gupta",
    doctorName: "Dr. Shah",
    disease: "Cough",
    date: "2025-04-12",
    type: "upcoming",
    notifications: 0,
  },
  {
    id: 4,
    patientName: "Meena Joshi",
    doctorName: "Dr. Batra",
    disease: "Allergy",
    date: "2025-04-13",
    type: "upcoming",
    notifications: 3,
  },
  {
    id: 5,
    patientName: "Rajeev Kumar",
    doctorName: "Dr. Rao",
    disease: "Flu",
    date: "2025-04-14",
    type: "upcoming",
    notifications: 0,
  },
  {
    id: 6,
    patientName: "Kavya Singh",
    doctorName: "Dr. Deshmukh",
    disease: "Headache",
    date: "2025-04-15",
    type: "upcoming",
    notifications: 1,
  },
  {
    id: 7,
    patientName: "Ishaan Malhotra",
    doctorName: "Dr. Iyer",
    disease: "High BP",
    date: "2025-04-16",
    type: "upcoming",
    notifications: 0,
  },
  {
    id: 8,
    patientName: "Tanya Patel",
    doctorName: "Dr. Nair",
    disease: "Stomach Pain",
    date: "2025-04-17",
    type: "upcoming",
    notifications: 2,
  },
  {
    id: 9,
    patientName: "Yash Raj",
    doctorName: "Dr. Kohli",
    disease: "Infection",
    date: "2025-04-18",
    type: "upcoming",
    notifications: 0,
  },
  {
    id: 10,
    patientName: "Neha Kapoor",
    doctorName: "Dr. Bhatt",
    disease: "Migraine",
    date: "2025-04-19",
    type: "upcoming",
    notifications: 1,
  },

  // --- STARTED ---
  {
    id: 11,
    patientName: "Aarav Verma",
    doctorName: "Dr. Das",
    disease: "Asthma",
    date: "2025-04-06",
    type: "started",
    notifications: 1,
  },
  {
    id: 12,
    patientName: "Sneha Jain",
    doctorName: "Dr. Gill",
    disease: "Thyroid",
    date: "2025-04-05",
    type: "started",
    notifications: 0,
  },
  {
    id: 13,
    patientName: "Deepak Rana",
    doctorName: "Dr. Rawat",
    disease: "Arthritis",
    date: "2025-04-04",
    type: "started",
    notifications: 2,
  },
  {
    id: 14,
    patientName: "Riya Malhotra",
    doctorName: "Dr. Anand",
    disease: "Skin Allergy",
    date: "2025-04-03",
    type: "started",
    notifications: 0,
  },
  {
    id: 15,
    patientName: "Krishna Nair",
    doctorName: "Dr. Reddy",
    disease: "PCOD",
    date: "2025-04-02",
    type: "started",
    notifications: 1,
  },
  {
    id: 16,
    patientName: "Varun Joshi",
    doctorName: "Dr. Singh",
    disease: "Back Pain",
    date: "2025-04-01",
    type: "started",
    notifications: 0,
  },
  {
    id: 17,
    patientName: "Tanvi Rao",
    doctorName: "Dr. Arora",
    disease: "Anxiety",
    date: "2025-03-31",
    type: "started",
    notifications: 1,
  },
  {
    id: 18,
    patientName: "Gaurav Mehta",
    doctorName: "Dr. Khan",
    disease: "Diabetes",
    date: "2025-03-30",
    type: "started",
    notifications: 0,
  },
  {
    id: 19,
    patientName: "Shruti Sinha",
    doctorName: "Dr. Pillai",
    disease: "Cold",
    date: "2025-03-29",
    type: "started",
    notifications: 2,
  },
  {
    id: 20,
    patientName: "Manav Gupta",
    doctorName: "Dr. Thomas",
    disease: "Sinus",
    date: "2025-03-28",
    type: "started",
    notifications: 0,
  },

  // --- COMPLETED ---
  {
    id: 21,
    patientName: "Ananya Singh",
    doctorName: "Dr. Kapoor",
    disease: "Diabetes",
    date: "2025-03-25",
    type: "completed",
    notifications: 0,
  },
  {
    id: 22,
    patientName: "Neeraj Bansal",
    doctorName: "Dr. Chawla",
    disease: "Low BP",
    date: "2025-03-24",
    type: "completed",
    notifications: 0,
  },
  {
    id: 23,
    patientName: "Sneha Kaur",
    doctorName: "Dr. Bhalla",
    disease: "Acne",
    date: "2025-03-23",
    type: "completed",
    notifications: 0,
  },
  {
    id: 24,
    patientName: "Abhay Kumar",
    doctorName: "Dr. Taneja",
    disease: "Ulcer",
    date: "2025-03-22",
    type: "completed",
    notifications: 0,
  },
  {
    id: 25,
    patientName: "Ira Joshi",
    doctorName: "Dr. Narayan",
    disease: "Liver Issue",
    date: "2025-03-21",
    type: "completed",
    notifications: 0,
  },
  {
    id: 26,
    patientName: "Kunal Chopra",
    doctorName: "Dr. Dey",
    disease: "Allergy",
    date: "2025-03-20",
    type: "completed",
    notifications: 0,
  },
  {
    id: 27,
    patientName: "Avantika Rao",
    doctorName: "Dr. Joshi",
    disease: "Skin Rash",
    date: "2025-03-19",
    type: "completed",
    notifications: 0,
  },
  {
    id: 28,
    patientName: "Rahul Patil",
    doctorName: "Dr. Verma",
    disease: "Joint Pain",
    date: "2025-03-18",
    type: "completed",
    notifications: 0,
  },
  {
    id: 29,
    patientName: "Pooja Desai",
    doctorName: "Dr. Singh",
    disease: "Insomnia",
    date: "2025-03-17",
    type: "completed",
    notifications: 0,
  },
  {
    id: 30,
    patientName: "Siddharth Malviya",
    doctorName: "Dr. Tyagi",
    disease: "Constipation",
    date: "2025-03-16",
    type: "completed",
    notifications: 0,
  },
];

const tabs = ["upcoming", "started", "completed"];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const router = useRouter();

  const filteredAppointments = sampleAppointments
    .filter((a) => a.type === activeTab)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <UserNavbar />
      <section className="min-h-screen bg-purple-100 dark:bg-purple-950 py-10 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-900 dark:text-white mb-8">
          Your Appointments
        </h2>

        <div className="flex flex-col sm:flex-row justify-center mb-8 gap-4 items-center cursor-pointer">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-semibold capitalize w-40 text-center cursor-pointer transition transform duration-200 hover:scale-105 active:scale-95 shadow-md",
                {
                  "bg-purple-700 text-white": activeTab === tab,
                  "bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-white":
                    activeTab !== tab,
                }
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              onClick={() => router.push(`/user/reports/${appt.id}`)}
              className="relative bg-pink-50 dark:bg-purple-900 shadow-md rounded-xl p-5 cursor-pointer hover:shadow-lg transition transform duration-200 hover:scale-105 active:scale-95"
            >
              {appt.notifications > 0 && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {appt.notifications}
                </span>
              )}
              <h3 className="text-lg font-semibold text-purple-800 dark:text-white">
                Patient: {appt.patientName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Doctor: {appt.doctorName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Disease: {appt.disease}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-400 mt-2 font-medium">
                Date: {appt.date}
              </p>
              <button
                onClick={() => router.push(`/user/reports/${appt.id}`)}
                className="mt-4 px-4 py-2 bg-purple-700 text-white text-sm rounded-full cursor-pointer hover:bg-purple-800 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="my-6 border-t border-gray-300 dark:border-gray-600" />
      </section>
      <UserFooter />
    </>
  );
}
