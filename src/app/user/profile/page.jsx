"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import UserNavbar from "@/components/UserNavbar";

function MyProfile() {
  const [isEditing, setIsEditing] = React.useState(false);

  const [userDetails, setUserDetails] = React.useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "1234 Elm St, Springfield, IL",
    emergencyContact: "+1 987 654 3210",
    bloodType: "O+",
    allergies: "Peanuts, Shellfish",
    medications: "Aspirin (daily)",
    weight: "75 kg",
    height: "180 cm",
    age: "30 years",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEdit = () => setIsEditing(!isEditing);
  const handleSaveChanges = () => setIsEditing(false);

  return (
    <>
      <UserNavbar />
      <div className="p-6 bg-purple-100 dark:bg-purple-900 min-h-screen">
        {isEditing ? (
          <div className="bg-purple-200 dark:bg-purple-800 p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-purple-900 dark:text-purple-100 mb-6 text-center">
              Edit Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(userDetails).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-purple-800 dark:text-purple-200 font-semibold mb-1 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md bg-white dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-600"
                  />
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={handleSaveChanges}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
              >
                Save Changes
              </Button>
              <Button
                onClick={toggleEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row gap-10">
            {/* Profile Section */}
            <div className="bg-purple-200 dark:bg-purple-800 p-6 rounded-xl w-full lg:w-1/3 shadow-xl">
              <div className="flex justify-center mb-4">
                <img
                  src="https://www.mepmiddleeast.com/cloud/2023/01/10/Narendra-Modi.jpg"
                  alt="User"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <Button
                  onClick={() => console.log("Logging out...")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                >
                  Logout
                </Button>
                <Button
                  onClick={toggleEdit}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md w-full sm:w-auto"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="space-y-4">
                {["name", "email", "phone", "address", "emergencyContact"].map((key) => (
                  <div
                    key={key}
                    className="flex flex-col lg:flex-row lg:justify-between text-md"
                  >
                    <span className="text-purple-800 dark:text-purple-200 font-semibold capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 text-right lg:ml-2">
                      {userDetails[key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Info Section */}
            <div className="bg-purple-200 dark:bg-purple-800 p-6 rounded-xl w-full lg:w-2/3 shadow-xl">
              <h3 className="text-3xl font-semibold text-purple-900 dark:text-purple-100 mb-6">
                Medical Information
              </h3>
              <div className="space-y-4">
                {[
                  "bloodPressure",
                  "sugarLevel",
                  "bloodType",
                  "medicalConditions",
                  "allergies",
                  "medications",
                  "weight",
                  "height",
                  "age",
                ].map((key) => (
                  <div
                    key={key}
                    className="flex flex-col lg:flex-row lg:justify-between text-md"
                  >
                    <span className="text-purple-800 dark:text-purple-200 font-semibold capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 text-right lg:ml-2">
                      {userDetails[key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MyProfile;
