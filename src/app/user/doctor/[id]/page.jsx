"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import doctor1 from "@/assets/doctor1.jpg";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";

// Predefined slot times
const timeSlots = {
  "10:00 AM": 3,
  "11:00 AM": 2,
  "12:00 PM": 5,
  "2:00 PM": 4,
  "3:00 PM": 1,
};

const isWeekday = (date) => {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Mon to Fri
};

export default function DoctorDetailsPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showSlots, setShowSlots] = useState(false);
  const [isValidDay, setIsValidDay] = useState(false);

  const doctor = {
    id: 1,
    name: "Dr. Ayesha Verma",
    specialization: "Cardiologist",
    rating: 4.8,
    price: 500,
    experience: "10+ years",
    education: "MBBS, MD (Cardiology) - AIIMS Delhi",
    location: "Heart Care Clinic, New Delhi",
    availability: "Mon - Fri, 10:00 AM - 4:00 PM",
    image: doctor1,
    bio: "Dr. Ayesha Verma is a renowned cardiologist with over a decade of experience in treating cardiovascular diseases. She is passionate about preventive heart care and advanced cardiac procedures.",
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formatted = selectedDate.toLocaleDateString("en-CA"); // yyyy-mm-dd
    setDate(formatted);
    setSelectedSlot("");
    setShowSlots(false);
    setIsValidDay(isWeekday(selectedDate));
  };

  const handleAppointment = () => {
    if (!date || !selectedSlot) {
      alert("Please select a date and a valid slot.");
      return;
    }
    router.push(`/user/doctor/${doctor.id}/booking`);
  };

  return (
    <>
      <UserNavbar />
      <div className="bg-purple-50 dark:bg-purple-900 min-h-screen py-10">
        <div className="max-w-5xl mx-auto bg-white dark:bg-purple-950 rounded-3xl shadow-xl p-8 md:p-12 border border-purple-300 dark:border-purple-700">
          {/* Doctor Info */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <Image
              src={doctor.image}
              alt={doctor.name}
              width={160}
              height={160}
              className="rounded-full border-4 border-purple-400 dark:border-purple-600 shadow-md"
            />
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-3xl font-bold text-purple-800 dark:text-purple-100">
                {doctor.name}
              </h2>
              <p className="text-xl font-medium text-purple-600 dark:text-purple-300">
                {doctor.specialization}
              </p>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {doctor.education}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 font-bold">
                ₹{doctor.price} per consultation
              </p>
              <div className="flex items-center gap-1 justify-center md:justify-start text-yellow-400">
                {[...Array(Math.round(doctor.rating))].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.916 1.428 8.294L12 18.896l-7.364 4.623 1.428-8.294-6.064-5.916 8.332-1.151z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-10 space-y-4 text-purple-800 dark:text-purple-100">
            <h3 className="text-2xl font-bold border-b border-purple-300 dark:border-purple-600 pb-2">
              About Doctor
            </h3>
            <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200">
              {doctor.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-xl">
                <p className="font-semibold">Experience</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {doctor.experience}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-xl">
                <p className="font-semibold">Clinic Location</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {doctor.location}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-xl">
                <p className="font-semibold">Availability</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  {doctor.availability}
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-xl">
                <p className="font-semibold">Consultation Fee</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  ₹{doctor.price}
                </p>
              </div>
            </div>
          </div>

          {/* Date & Slot Selection */}
          <div className="mt-12 space-y-6">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Select Appointment Date
              </label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-full px-3 py-2 rounded-lg border border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white"
              />
            </div>

            {/* Slot Reveal Button */}
            {date && (
              <div className="text-center">
                <button
                  onClick={() => setShowSlots(true)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                >
                  Select Slot
                </button>
              </div>
            )}

            {/* Slot Selector */}
            {showSlots && (
              <div>
                {isValidDay ? (
                  <>
                    <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      Available Time Slots
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(timeSlots).map(([slot, count]) => (
                        <label
                          key={slot}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                            selectedSlot === slot
                              ? "bg-green-500 text-white border-green-600"
                              : count === 0
                              ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
                              : "bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-white border-purple-300 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="slot"
                            value={slot}
                            checked={selectedSlot === slot}
                            onChange={() => setSelectedSlot(slot)}
                            disabled={count === 0}
                            className="hidden"
                          />
                          {slot}{" "}
                          <span className="text-xs ml-1 font-normal">
                            ({count} left)
                          </span>
                        </label>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-red-500 font-semibold">
                    Doctor is not available on weekends. Please select a weekday.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Appointment Button */}
          {selectedSlot && (
            <div className="mt-10 text-center">
              <button
                onClick={handleAppointment}
                className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                Take Appointment
              </button>
            </div>
          )}
        </div>
      </div>
      <UserFooter />
    </>
  );
}
