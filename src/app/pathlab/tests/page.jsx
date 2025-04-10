"use client";

import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import LabFooter from "@/components/LabFooter";
import LabNavbar from "@/components/LabNavbar";
const Page = () => {
  const [testName, setTestName] = useState("");
  const [tests, setTests] = useState([
    "Liver Function Test",
    "Thyroid Profile",
    "Complete Blood Count",
  ]);

  const handleAddTest = () => {
    if (testName.trim() !== "") {
      setTests([...tests, testName.trim()]);
      setTestName("");
    }
  };

  const handleDelete = (name) => {
    const updated = tests.filter((test) => test !== name);
    setTests(updated);
  };

  return (
    <>
      <LabNavbar />
      <div className="min-h-screen bg-purple-50 dark:bg-purple-950 p-6 sm:p-10">
        <h1 className="text-4xl font-bold text-center text-purple-900 dark:text-purple-100 mb-10">
          🧪 Lab Test Management
        </h1>

        <div className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-purple-900 shadow-xl border border-purple-200 dark:border-purple-700 rounded-2xl p-8">
          {/* Add Test Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter new test name"
              className="flex-1 px-4 py-2 rounded-lg border border-purple-300 dark:border-purple-600 bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAddTest}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition font-medium"
            >
              <PlusCircle size={18} />
              Add Test
            </button>
          </div>

          {/* Test List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {tests.length === 0 ? (
              <p className="text-gray-500 text-center">No tests added yet.</p>
            ) : (
              tests.map((test, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  <span className="font-medium">{test}</span>
                  <button
                    onClick={() => handleDelete(test)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete test"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <LabFooter />
    </>
  );
};

export default Page;
