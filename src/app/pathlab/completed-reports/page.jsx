"use client";

import React from "react";
import LabFooter from "@/components/LabFooter";
import LabNavbar from "@/components/LabNavbar";

// Sample data (only completed ones will be shown)
const tickets = [
  {
    id: "1",
    patient: "Anjali Mehta",
    test: "X-Ray",
    date: "2025-04-10",
    status: "Completed",
  },
  {
    id: "2",
    patient: "Neeraj Sharma",
    test: "CBC Blood Test",
    date: "2025-04-05",
    status: "Completed",
  },
];

const Page = () => {
  return (
    <>
      <LabNavbar />
      <div className="min-h-screen bg-purple-50 dark:bg-purple-900 p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-purple-800 dark:text-white mb-6 text-center">
          Reports Submitted
        </h1>

        {tickets.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No completed reports yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white dark:bg-purple-950 border border-purple-200 dark:border-purple-700 rounded-xl shadow p-5 space-y-2 cursor-default"
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
                <div className="inline-block text-xs px-3 py-1 rounded-full bg-green-200 text-green-800">
                  {ticket.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <LabFooter />
    </>
  );
};

export default Page;
