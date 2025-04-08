"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Stethoscope, Menu } from "lucide-react";
import Link from "next/link";

export default function DocNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-100 dark:bg-purple-900 shadow-md sticky top-0 z-50 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <Stethoscope className="text-purple-700" />
          <span
            onClick={() => (window.location.href = "/doctor/home")}
            className="cursor-pointer"
          >
            Rakshaa
          </span>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex gap-6 font-semibold text-md">
          <Link href="/doctor/home" className="hover:text-purple-700 font-bold">
            Home
          </Link>
          <Link href="/doctor/dashboard" className="hover:text-purple-700 font-bold">
            Dashboard
          </Link>
          <Link href="/doctor/appointments" className="hover:text-purple-700 font-bold">
            Appointments
          </Link>
          <Link href="/predict-disease" className="hover:text-purple-700 font-bold">
            Disease-prediction
          </Link>
        </div>

        {/* Right: Profile + Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/doctor/profile">
            <Avatar className="w-9 h-9 border-2 border-purple-400 hover:border-purple-600 transition">
              <AvatarImage
                src="https://i.pinimg.com/736x/47/34/89/473489f7b154c89fd81f5e4bc5421425.jpg"
                alt="Doctor Profile"
              />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 font-semibold text-md">
          <Link href="/doctor/home" className="hover:text-purple-700 font-bold">
            Home
          </Link>
          <Link href="/doctor/dashboard" className="hover:text-purple-700 font-bold">
            Dashboard
          </Link>
          <Link href="/doctor/appointments" className="hover:text-purple-700 font-bold">
            Appointments
          </Link>
          <Link href="/predict-disease" className="hover:text-purple-700 font-bold">
            Disease-prediction
          </Link>
        </div>
      )}
    </nav>
  );
}
