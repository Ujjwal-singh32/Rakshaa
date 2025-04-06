"use client";

import Image from "next/image";
import lab1 from "@/assets/lab1.jpg";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
const pathlabs = [
  {
    id: 1,
    name: "Thyrocare Diagnostics",
    specialization: "Thyroid & Preventive Health Packages",
    bio: "Nationwide trusted lab for thyroid and full body health checkups.",
  },
  {
    id: 2,
    name: "Dr. Lal PathLabs",
    specialization: "Comprehensive Pathology Tests",
    bio: "One of India's largest diagnostic chains with accurate results.",
  },
  {
    id: 3,
    name: "Redcliff Labs",
    specialization: "At-Home Test Services",
    bio: "Modern lab with online booking & doorstep sample collection.",
  },
  {
    id: 4,
    name: "Apollo Diagnostics",
    specialization: "Hospital-Grade Pathology",
    bio: "Backed by Apollo Hospitals, offers trustworthy diagnostics.",
  },
  {
    id: 5,
    name: "SRL Diagnostics",
    specialization: "Advanced Lab Testing",
    bio: "Reliable pathology tests with nationwide presence.",
  },
  {
    id: 6,
    name: "Metropolis Healthcare",
    specialization: "Accredited Lab Testing",
    bio: "High-quality lab services with international standards.",
  },
  {
    id: 7,
    name: "Healthians",
    specialization: "Home Sample Collection",
    bio: "Affordable diagnostics with easy online booking.",
  },
  {
    id: 8,
    name: "Pathkind Labs",
    specialization: "Full Body Packages",
    bio: "Trusted labs with accurate test results and wide coverage.",
  },
  {
    id: 9,
    name: "Max Lab",
    specialization: "Hospital Partnered Diagnostics",
    bio: "Part of Max Healthcare for trusted lab services.",
  },
  {
    id: 10,
    name: "Vijaya Diagnostic",
    specialization: "Radiology & Pathology",
    bio: "Leading provider of diagnostic imaging and pathology.",
  },
  {
    id: 11,
    name: "Oncquest Labs",
    specialization: "Specialty Cancer Tests",
    bio: "Expert in oncology-related diagnostics and genomics.",
  },
  {
    id: 12,
    name: "Aarthi Scans and Labs",
    specialization: "Low-cost Lab Imaging",
    bio: "Affordable scans and pathology services across India.",
  },
  {
    id: 13,
    name: "Medall Diagnostics",
    specialization: "Affordable Diagnostics",
    bio: "Value-for-money packages and trusted lab results.",
  },
  {
    id: 14,
    name: "Suburban Diagnostics",
    specialization: "Digital Lab Experience",
    bio: "Modern lab reports with mobile access and tracking.",
  },
  {
    id: 15,
    name: "Core Diagnostics",
    specialization: "High-End Molecular Testing",
    bio: "Focus on cutting-edge research-based pathology.",
  },
  {
    id: 16,
    name: "Lucid Medical Diagnostics",
    specialization: "Multi-specialty Testing",
    bio: "Lab testing for both pathology and radiology.",
  },
  {
    id: 17,
    name: "City X-Ray & Scan",
    specialization: "X-Ray and Lab Services",
    bio: "One-stop center for imaging and diagnostics.",
  },
  {
    id: 18,
    name: "Prima Diagnostics",
    specialization: "Wellness and Lifestyle Testing",
    bio: "Personalized health tests for better living.",
  },
  {
    id: 19,
    name: "Orange Health",
    specialization: "Fast Home Testing",
    bio: "Tests in just 60 minutes from home with live tracking.",
  },
  {
    id: 20,
    name: "LifeCell Diagnostics",
    specialization: "Genetic & Prenatal Testing",
    bio: "India’s leading genetic and stem cell testing provider.",
  },
];
export default function PathlabSection() {
  return (
    <>
      <UserNavbar />
      <section className="py-12 px-4 bg-purple-50 dark:bg-purple-900 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-purple-800 dark:text-purple-100">
            Book Pathology Tests at Trusted Labs
          </h2>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {pathlabs.map((lab) => (
              <div
                key={lab.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col sm:flex-row">
                  <Image
                    src={lab1}
                    alt={lab.name}
                    width={300}
                    height={200}
                    className="object-cover w-full sm:w-[300px] h-[200px] sm:h-auto"
                  />
                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 dark:text-purple-100">
                        {lab.name}
                      </h3>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        {lab.specialization}
                      </p>
                      <p className="text-gray-600 dark:text-purple-300 mt-2 text-sm">
                        {lab.bio}
                      </p>
                    </div>
                    <button className="mt-4 w-fit px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition">
                      Book Test
                    </button>
                  </div>
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
