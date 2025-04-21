"use client";

import React, { useState } from "react";
import LabFooter from "@/components/LabFooter";
import LabNavbar from "@/components/LabNavbar";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    testName: "",
    imageFile: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("patientName", formData.patientName);
    form.append("testName", formData.testName);
    form.append("reportImage", formData.imageFile);

    try {
      const res = await fetch("/api/lab-reports/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        alert("Report submitted successfully!");
        setShowForm(false);
        setFormData({ patientName: "", testName: "", imageFile: null });
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      console.error("Submit error", err);
      alert("Server error");
    }
  };

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

        {/* Upload Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowForm(true)}
            className="text-white bg-purple-700 hover:bg-purple-800 font-semibold py-2 px-4 rounded-full text-lg shadow"
          >
            + Upload New Report
          </button>
        </div>

        {/* Upload Form */}
        {showForm && (
          <div className="fixed inset-0 bg-purple-500 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-purple-900 rounded-xl shadow p-6 w-full max-w-md space-y-4">
              <h2 className="text-xl font-bold text-purple-800 dark:text-white">
                Upload Report
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Patient Name"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Test Name"
                  value={formData.testName}
                  onChange={(e) =>
                    setFormData({ ...formData, testName: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, imageFile: e.target.files[0] })
                  }
                  required
                  className="w-full border rounded px-3 py-2"
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-700 text-white rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <LabFooter />
    </>
  );
};

export default Page;
