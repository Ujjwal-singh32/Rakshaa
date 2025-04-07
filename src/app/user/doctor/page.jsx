"use client";

import Image from "next/image";
import Link from "next/link";
import doctor1 from "@/assets/doctor1.jpg";
import { useState, useEffect, useRef } from "react";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import { useRouter } from "next/navigation";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Verma",
    specialization: "Cardiologist",
    bio: "Expert in heart health and cardiovascular diseases.",
    image: doctor1,
    price: 500,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Dr. Rohan Mehta",
    specialization: "Neurologist",
    bio: "Specializes in brain and nervous system treatments.",
    image: doctor1,
    price: 600,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Dr. Nisha Kapoor",
    specialization: "Dermatologist",
    bio: "Focused on skin care and modern dermatological procedures.",
    image: doctor1,
    price: 400,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Dr. Sameer Saxena",
    specialization: "Orthopedic",
    bio: "Performs bone surgeries with precision and care.",
    image: doctor1,
    price: 700,
    rating: 4.6,
  },
  {
    id: 5,
    name: "Dr. Anjali Iyer",
    specialization: "Pediatrician",
    bio: "Caring for infants, children, and adolescents.",
    image: doctor1,
    price: 450,
    rating: 4.9,
  },
];

export default function DoctorSection() {
  const router = useRouter();
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const specializations = [
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  const toggleSpecialization = (spec) => {
    if (selectedSpecializations.includes(spec)) {
      setSelectedSpecializations(
        selectedSpecializations.filter((s) => s !== spec)
      );
    } else {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let filteredDoctors = doctors.filter((doc) =>
    selectedSpecializations.length === 0
      ? true
      : selectedSpecializations.includes(doc.specialization)
  );

  if (sortBy === "price") {
    filteredDoctors.sort((a, b) => a.price - b.price);
  } else if (sortBy === "rating") {
    filteredDoctors.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <UserNavbar />
      <section className="py-10 bg-purple-50 dark:bg-purple-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-100 mb-8 text-center">
            Meet Our Experts
          </h1>

          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center relative">
            {/* Filter Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border border-purple-300 dark:border-purple-600 bg-white dark:bg-purple-800 rounded px-3 py-2 text-sm font-medium text-purple-800 dark:text-purple-100"
              >
                Filter by Specialization ⏷
              </button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-2 bg-white dark:bg-purple-800 border border-purple-300 dark:border-purple-600 rounded-lg shadow-lg p-3 max-h-60 overflow-y-auto w-56">
                  {specializations.map((spec) => (
                    <label
                      key={spec}
                      className="block text-sm text-purple-800 dark:text-purple-100 mb-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSpecializations.includes(spec)}
                        onChange={() => toggleSpecialization(spec)}
                        className="mr-2 accent-purple-600"
                      />
                      {spec}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-purple-300 dark:border-purple-600 rounded px-3 py-2 text-sm text-purple-800 dark:text-purple-100 bg-white dark:bg-purple-800"
            >
              <option value="">Sort By</option>
              <option value="price">Price (Low to High)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gradient-to-tr from-purple-200 via-white to-purple-100 dark:from-purple-800 dark:via-purple-950 dark:to-purple-900 shadow-md rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-purple-300 dark:border-purple-700"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-purple-400 dark:border-purple-600 shadow-md"
                  />
                  <h2 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                    {doctor.name}
                  </h2>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-300">
                    {doctor.specialization}
                  </p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 max-w-[90%]">
                    {doctor.bio}
                  </p>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    ₹{doctor.price}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(Math.round(doctor.rating))].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4"
                      >
                        <path d="M12 .587l3.668 7.571 8.332 1.151-6.064 5.916 1.428 8.294L12 18.896l-7.364 4.623 1.428-8.294-6.064-5.916 8.332-1.151z" />
                      </svg>
                    ))}
                  </div>

                  <button
                    onClick={() => router.push(`/user/doctor/${doctor.id}`)}
                    className="mt-3 px-5 py-2 cursor-pointer rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md hover:scale-105 transition"
                  >
                    Take Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <UserFooter />
    </>
  );
}
