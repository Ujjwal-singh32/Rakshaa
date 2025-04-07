"use client";

import React, { useState } from "react";
import { LogOut, Pencil, Save, X } from "lucide-react";
import LabFooter from "@/components/LabFooter";
import LabNavbar from "@/components/LabNavbar";

const Page = () => {
  const initialLab = {
    name: "HealthPlus Diagnostics",
    email: "contact@healthpluslab.com",
    address: "123 Wellness Street, New Delhi, India",
    phone: "+91 9876543210",
    image: "https://www.mepmiddleeast.com/cloud/2023/01/10/Narendra-Modi.jpg",
  };

  const [lab, setLab] = useState(initialLab);
  const [editMode, setEditMode] = useState(false);
  const [tempLab, setTempLab] = useState(initialLab);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setLab(tempLab);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempLab(lab);
    setEditMode(false);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleChange = (field, value) => {
    setTempLab({ ...tempLab, [field]: value });
  };

  return (
    <>
      <LabNavbar />
      <div className="min-h-[80vh] bg-purple-50 dark:bg-purple-950 p-6 sm:p-10 flex items-center justify-center">
        <div className="bg-white dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={lab.image}
              alt="Lab"
              className="w-32 h-32 rounded-full border-4 border-purple-300 dark:border-purple-700 object-cover shadow-md"
            />
            <div className="text-center sm:text-left space-y-2 w-full">
              {["name", "email", "address", "phone"].map((field) => (
                <div key={field}>
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-300 capitalize">
                    {field}:
                  </p>
                  {editMode ? (
                    <input
                      type="text"
                      value={tempLab[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className="w-full mt-1 p-2 rounded-md bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-sm text-gray-800 dark:text-gray-300">
                      {lab[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-4 pt-4">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                >
                  <Save size={18} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition font-medium"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEditProfile}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition font-medium"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
      <LabFooter />
    </>
  );
};

export default Page;
  