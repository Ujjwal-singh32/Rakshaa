"use client";

import React, { useState } from "react";
import { FileUp, Eye, CheckCircle, Send } from "lucide-react";
import LabFooter from "@/components/LabFooter";
import LabNavbar from "@/components/LabNavbar";
const reportData = {
  id: 1,
  patient: "Riya Kapoor",
  test: "Liver Function Test",
  date: "2025-04-06",
  status: "Pending",
  pdfs: [],
};

const Page = () => {
  const [report, setReport] = useState(reportData);

  const handleUpload = (files) => {
    const newFiles = Array.from(files);
    setReport((prev) => ({
      ...prev,
      pdfs: [...prev.pdfs, ...newFiles],
    }));
  };

  const handleMarkCompleted = () => {
    setReport({ ...report, status: "Completed" });
  };

  return (

    <>
    <LabNavbar/>
    <div className="min-h-screen bg-purple-50 dark:bg-purple-950 p-6 sm:p-10">
      <h1 className="text-4xl font-bold text-center text-purple-900 dark:text-purple-100 mb-12">
        🧾 Report Details
      </h1>

      <div className="max-w-xl mx-auto bg-white dark:bg-purple-900 border border-purple-300 dark:border-purple-700 rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-purple-800 dark:text-purple-100">
            {report.patient}
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="font-medium">Test:</strong> {report.test}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="font-medium">Date:</strong> {report.date}
          </p>
          <p
            className={`text-sm font-semibold ${
              report.status === "Pending"
                ? "text-yellow-600"
                : "text-green-500"
            }`}
          >
            Status: {report.status}
          </p>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="flex items-center gap-2 text-purple-700 dark:text-purple-200 font-medium text-sm">
              <FileUp size={16} />
              Upload Report PDFs:
            </span>
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => handleUpload(e.target.files)}
              className="mt-1 w-full p-2 bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </label>

          {report.pdfs.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {report.pdfs.map((pdf, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-100 dark:bg-purple-800 p-2 rounded-lg"
                >
                  <span className="text-sm text-purple-900 dark:text-purple-100 truncate max-w-[70%]">
                    {pdf.name}
                  </span>
                  <a
                    href={URL.createObjectURL(pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs"
                  >
                    <Eye size={14} /> See
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleMarkCompleted}
            className="flex items-center gap-2 justify-center px-4 py-2 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-lg transition text-sm font-medium"
          >
            <CheckCircle size={16} />
            Mark Completed
          </button>
          <button className="flex items-center gap-2 justify-center px-4 py-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">
            <Send size={16} />
            Send
          </button>
        </div>
      </div>
    </div>
    <LabFooter/>
    </>
  );
};

export default Page;
