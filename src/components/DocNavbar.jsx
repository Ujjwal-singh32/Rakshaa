import Link from "next/link";
import { Stethoscope, ClipboardList, LayoutDashboard, User } from "lucide-react";

export default function DocNav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-violet-200 text-purple-900 shadow-md mb-1.5">
      <div className="text-xl font-bold flex items-center gap-2">
        <Stethoscope className="text-purple-700" /> Doctor Panel
      </div>
      <ul className="flex gap-6 text-md font-medium">
        <li className="hover:text-purple-600 transition">
          <Link href="/doctor/home#dashboard">
            <LayoutDashboard className="inline mr-1" /> Dashboard
          </Link>
        </li>
        <li className="hover:text-purple-600 transition">
          <Link href="/doctor/home#appointments">
            <ClipboardList className="inline mr-1" /> Appointments
          </Link>
        </li>
        <li className="hover:text-purple-600 transition">
          <Link
            href="/doctor/profile"
            className="font-bold px-3 py-1 rounded-md border border-purple-400 hover:border-purple-600 transition mb-1"
          >
            <User className="inline mr-1" /> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
