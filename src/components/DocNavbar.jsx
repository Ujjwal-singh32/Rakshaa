"use client"

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Stethoscope, Menu } from "lucide-react";
import Link from "next/link";

export default function DocNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex flex-wrap md:flex-nowrap items-center justify-between px-6 py-4 bg-purple-100 dark:bg-purple-900 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between w-full md:w-auto">
      <div className="flex items-center gap-2 text-xl font-bold">
  <Stethoscope className="text-purple-700" />
  <span onClick={() => window.location.href = '/doctor/home'} style={{ cursor: "pointer" }}>
    Rakshaa
  </span>
</div>

        <button
          className="md:hidden text-purple-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div
        className={`w-full md:w-auto md:flex gap-6 font-semibold text-md ${
          menuOpen ? "block mt-4" : "hidden"
        } md:mt-0 md:flex`}
      >
        <Link href="/doctor/home" className="block font-bold py-1 md:py-0 hover:text-purple-700">
          Home
        </Link>
        <Link href="/doctor/dashboard" className="block font-bold py-1 md:py-0 hover:text-purple-700">
          Dashboard
        </Link>
        <Link href="/doctor/appointments" className="block font-bold py-1 md:py-0 hover:text-purple-700">
          Appointments
        </Link>
        <Link href="/predict-disease" className="block font-bold py-1 md:py-0 hover:text-purple-700">
          Disease-prediction
        </Link>
      </div>

      <Link href="/doctor/profile" className="ml-auto md:ml-0">
        <Avatar className="w-9 h-9 border-2 border-purple-400 hover:border-purple-600 transition">
          <AvatarImage src="https://i.pinimg.com/736x/47/34/89/473489f7b154c89fd81f5e4bc5421425.jpg" alt="Doctor Profile" />
          <AvatarFallback>DR</AvatarFallback>
        </Avatar>
      </Link>
    </nav>
  );
}
