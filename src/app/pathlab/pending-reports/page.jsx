"use client";

import React from "react";
import Link from "next/link";
import LabFooter from "@/components/LabFooter";
import LabNavbar from "@/components/LabNavbar";

// Sample data
const tickets = [
  {
    id: "1",
    patient: "Ravi Kumar",
    test: "Blood Test",
    date: "2025-04-08",
    status: "Pending",
  },
  {
    id: "2",
    patient: "Anjali Mehta",
    test: "X-Ray",
    date: "2025-04-10",
    status: "Pending",
  },
  {
    id: "3",
    patient: "Amit Singh",
    test: "MRI Scan",
    date: "2025-04-12",
    status: "Pending",
  },
  {
    id: "4",
    patient: "Neeraj Sharma",
    test: "CBC Blood Test",
    date: "2025-04-05",
    status: "Pending",
  },
  {
    id: "5",
    patient: "Neeraj Sharma",
    test: "CBC Blood Test",
    date: "2025-04-05",
    status: "Pending",
  },
  {
    id: "6",
    patient: "Neeraj Sharma",
    test: "CBC Blood Test",
    date: "2025-04-05",
    status: "Pending",
  },
  {
    id: "7",
    patient: "Neeraj Sharma",
    test: "CBC Blood Test",
    date: "2025-04-05",
    status: "Pending",
  },
];

const Page = () => {
  return (
    <>
      <LabNavbar />
      <div className="min-h-screen bg-purple-50 dark:bg-purple-900 p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 dark:text-white mb-6 text-center">
          Pending Lab Tests
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              href={`/pathlab/pending-reports/${ticket.id}`}
              className="bg-white dark:bg-purple-950 border border-purple-200 dark:border-purple-700 rounded-xl shadow hover:shadow-lg transition p-5 space-y-2"
            >
              <div className="text-lg font-semibold text-purple-800 dark:text-purple-100">
                {ticket.patient}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Test: <span className="font-medium">{ticket.test}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Date: <span className="font-medium">{ticket.date}</span>
              </div>
              <div
                className={`inline-block text-xs px-3 py-1 rounded-full ${
                  ticket.status === "Pending"
                    ? "bg-yellow-200 text-yellow-800"
                    : ticket.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {ticket.status}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <LabFooter />
    </>
  );
};

export default Page;
