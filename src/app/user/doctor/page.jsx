"use client";

import Image from "next/image";
import Link from "next/link";
import doctor1 from "@/assets/doctor1.jpg";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import Navbar from "@/components/UserNavbar";

const doctors = [
  {
    id: 1,
    name: "Dr. Ayesha Verma",
    specialization: "Cardiologist",
    bio: "Expert in heart health and cardiovascular diseases.",
    image: doctor1,
  },
  {
    id: 2,
    name: "Dr. Rohan Mehta",
    specialization: "Neurologist",
    bio: "Specializes in brain and nervous system treatments.",
    image: doctor1,
  },
  {
    id: 3,
    name: "Dr. Nisha Kapoor",
    specialization: "Dermatologist",
    bio: "Focused on skin care and modern dermatological procedures.",
    image: doctor1,
  },
  {
    id: 4,
    name: "Dr. Sameer Saxena",
    specialization: "Orthopedic Surgeon",
    bio: "Performs bone surgeries with precision and care.",
    image: doctor1,
  },
  {
    id: 5,
    name: "Dr. Anjali Iyer",
    specialization: "Pediatrician",
    bio: "Caring for infants, children, and adolescents.",
    image: doctor1,
  },
  {
    id: 6,
    name: "Dr. Vivek Sharma",
    specialization: "General Physician",
    bio: "Expert in diagnosing common illnesses and treatments.",
    image: doctor1,
  },
  {
    id: 7,
    name: "Dr. Priya Joshi",
    specialization: "Gynecologist",
    bio: "Women's reproductive health specialist.",
    image: doctor1,
  },
  {
    id: 8,
    name: "Dr. Aman Gupta",
    specialization: "ENT Specialist",
    bio: "Ear, nose, and throat specialist with 10+ years of experience.",
    image: doctor1,
  },
  {
    id: 9,
    name: "Dr. Kavita Singh",
    specialization: "Psychiatrist",
    bio: "Mental health and wellness expert.",
    image: doctor1,
  },
  {
    id: 10,
    name: "Dr. Tarun Yadav",
    specialization: "Pulmonologist",
    bio: "Treats lung and respiratory system disorders.",
    image: doctor1,
  },
  {
    id: 11,
    name: "Dr. Neha Bansal",
    specialization: "Oncologist",
    bio: "Cancer care specialist using the latest treatment techniques.",
    image: doctor1,
  },
  {
    id: 12,
    name: "Dr. Rajiv Malhotra",
    specialization: "Gastroenterologist",
    bio: "Specialist in digestive system issues and treatment.",
    image: doctor1,
  },
  {
    id: 13,
    name: "Dr. Swati Desai",
    specialization: "Endocrinologist",
    bio: "Focuses on hormonal disorders and diabetes care.",
    image: doctor1,
  },
  {
    id: 14,
    name: "Dr. Ankur Jain",
    specialization: "Nephrologist",
    bio: "Treats kidney-related conditions and dialysis patients.",
    image: doctor1,
  },
  {
    id: 15,
    name: "Dr. Meera Kulkarni",
    specialization: "Ophthalmologist",
    bio: "Eye specialist offering modern vision correction solutions.",
    image: doctor1,
  },
  {
    id: 16,
    name: "Dr. Aditya Bhatt",
    specialization: "Rheumatologist",
    bio: "Expert in joint and autoimmune disorders.",
    image: doctor1,
  },
  {
    id: 17,
    name: "Dr. Reena Shah",
    specialization: "Allergist",
    bio: "Helps manage allergies and asthma with customized plans.",
    image: doctor1,
  },
  {
    id: 18,
    name: "Dr. Harsh Vardhan",
    specialization: "Urologist",
    bio: "Specialist in urinary tract and male reproductive health.",
    image: doctor1,
  },
  {
    id: 19,
    name: "Dr. Pooja Mittal",
    specialization: "Hematologist",
    bio: "Focused on blood disorders and treatments.",
    image: doctor1,
  },
  {
    id: 20,
    name: "Dr. Mohit Raina",
    specialization: "Infectious Disease Specialist",
    bio: "Expert in infectious diseases and outbreak control.",
    image: doctor1,
  },
];

export default function DoctorSection() {
  return (
    <>
      <UserNavbar />
      <section className="py-10 bg-purple-50 dark:bg-purple-900">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-100 mb-8 text-center">
            Meet Our Experts
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-gradient-to-tr from-purple-200 via-white to-purple-100 dark:from-purple-800 dark:via-purple-950 dark:to-purple-900 shadow-md rounded-3xl p-5 transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-purple-300 dark:border-purple-700"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={80 }
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

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
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

                  {/* Book Now Button */}
                  <Link href={`/book/${doctor.id}`}>
                    <button className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md hover:scale-105 transition">
                      Take Appointment
                    </button>
                  </Link>
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
