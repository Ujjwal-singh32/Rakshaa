"use client"
import * as React from "react";
import { Button } from "@/components/ui/Button"; // Assuming you have a Button component
import UserNavbar from "@/components/UserNavbar";

function MyProfile() {
  const [isEditing, setIsEditing] = React.useState(false);

  // States for user details
  const [userDetails, setUserDetails] = React.useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "1234 Elm St, Springfield, IL",
    emergencyContact: "+1 987 654 3210",
    bloodPressure: "120/80 mmHg",
    sugarLevel: "Normal (90 mg/dL)",
    bloodType: "O+",
    medicalConditions: "None",
    allergies: "Peanuts, Shellfish",
    medications: "Aspirin (daily)",
    weight: "75 kg",
    height: "180 cm",
    age: "30 years"
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Toggle between edit and view mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  return (
    <>
      <UserNavbar />
      <div className="flex gap-10 p-8 bg-purple-100 dark:bg-purple-900 min-h-screen">
        {/* Left Section: Profile Picture, Edit Profile, User Details */}
        <div className="bg-purple-200 dark:bg-purple-800 p-8 rounded-xl w-1/3 shadow-xl">
          {/* Profile Picture */}
          <div className="flex justify-center items-center">
          <img
            src="https://www.mepmiddleeast.com/cloud/2023/01/10/Narendra-Modi.jpg"
            alt="User Profile"
            className="w-36 h-36 rounded-full object-cover shadow-md"
          />
          </div>

          {/* Edit Profile Button */}
          <Button
            onClick={toggleEdit}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-md shadow-md transition-all mt-4"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>

          {/* User Details */}
          
          <div className="space-y-6 mt-6">
            {/* Name */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Phone:</span>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.phone}</span>
              )}
            </div>

            {/* Address */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Address:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={userDetails.address}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.address}</span>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Emergency Contact:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="emergencyContact"
                  value={userDetails.emergencyContact}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.emergencyContact}</span>
              )}
            </div>
          </div>

          {/* Save Changes Button */}
          {isEditing && (
            <Button
              onClick={handleSaveChanges}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-md shadow-md transition-all"
            >
              Save Changes
            </Button>
          )}
        </div>

        {/* Right Section: Medical Information */}
        <div className="bg-purple-200 dark:bg-purple-800 p-8 rounded-xl w-2/3 shadow-xl">
          <h3 className="text-3xl font-semibold text-purple-900 dark:text-purple-100 mb-6">Medical Information</h3>
          <div className="space-y-6">
            {/* Blood Pressure */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Blood Pressure:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="bloodPressure"
                  value={userDetails.bloodPressure}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.bloodPressure}</span>
              )}
            </div>

            {/* Sugar Level */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Sugar Level:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="sugarLevel"
                  value={userDetails.sugarLevel}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.sugarLevel}</span>
              )}
            </div>

            {/* Blood Type */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Blood Type:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="bloodType"
                  value={userDetails.bloodType}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.bloodType}</span>
              )}
            </div>

            {/* Medical Conditions */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Medical Conditions:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="medicalConditions"
                  value={userDetails.medicalConditions}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.medicalConditions}</span>
              )}
            </div>

            {/* Allergies */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Allergies:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="allergies"
                  value={userDetails.allergies}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.allergies}</span>
              )}
            </div>

            {/* Medications */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Medications:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="medications"
                  value={userDetails.medications}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.medications}</span>
              )}
            </div>

            {/* Weight */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Weight:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="weight"
                  value={userDetails.weight}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.weight}</span>
              )}
            </div>

            {/* Height */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Height:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="height"
                  value={userDetails.height}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.height}</span>
              )}
            </div>

            {/* Age */}
            <div className="flex justify-between text-lg">
              <span className="text-purple-800 dark:text-purple-200 font-semibold">Age:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="age"
                  value={userDetails.age}
                  onChange={handleChange}
                  className="text-purple-600 dark:text-purple-400"
                />
              ) : (
                <span className="text-purple-600 dark:text-purple-400">{userDetails.age}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
