import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {  Stethoscope } from "lucide-react";
import Link from "next/link";

export default function DocNav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-purple-100 dark:bg-purple-900 shadow-md sticky top-0 z-50">
    <div className="flex items-center gap-2 text-xl font-bold">
      <Stethoscope className="text-purple-700" /> <span>Rakshaa</span>
    </div>
    <div className="flex gap-6 font-semibold text-md">
    <Link href="/doctor/home" className="hover:text-purple-700">Home</Link>
      <Link href="/doctor/dashboard" className="hover:text-purple-700">Dashboard</Link>
      <Link href="/doctor/appointments" className="hover:text-purple-700">Appointments</Link>
    </div>
    <Link href="/doctor/profile">
      <Avatar className="w-9 h-9 border-2 border-purple-400 hover:border-purple-600 transition">
        <AvatarImage src="/profile.jpg" alt="Doctor Profile" />
        <AvatarFallback>DR</AvatarFallback>
      </Avatar>
    </Link>
  </nav>
  );
}
