"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const userData = useUser();
  const user = userData.user;
  const loading = userData.loading;
  return (
    <header className="w-full bg-purple-100 dark:bg-purple-900 shadow-sm top-0 sticky z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link
            href="/user/home"
            className="text-xl font-bold text-purple-700 dark:text-purple-200"
          >
            🩺 Rakshaa
          </Link>
        </div>

        {/* Center: Links */}
        <nav className="hidden md:flex gap-6 ">
          <NavLink href="/user/doctor" label="Doctors" />
          <NavLink href="/user/pathlabs" label="Path Labs" />
          <NavLink href="/user/ai" label="Ask Sakhsam" />
          <NavLink href="/user/ml" label="Predict Disease" />
          <NavLink href="/user/reports" label="Appointments" />
          <NavLink href="/user/pathlab-reports" label="Reports" />
        </nav>

        {/* Right: Profile + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Profile */}
          <Link href="/user/profile">
            <Avatar className="w-9 h-9 border-2 border-purple-400 hover:border-purple-600 transition">
              {user?.profilePic ? (
                <AvatarImage src={user.profilePic} alt="Profile" />
              ) : (
                <AvatarImage src="/default-avatar.png" alt="Default Avatar" />
              )}
              <AvatarFallback>MP</AvatarFallback>
            </Avatar>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-purple-700 dark:text-purple-200 cursor-pointer">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white dark:bg-purple-950"
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6 ml-5 text-purple-800 dark:text-purple-100">
                  <NavLink href="/user/doctor" label="Doctors" />
                  <NavLink href="/user/pathlabs" label="Path Labs" />
                  <NavLink href="/user/ai" label="Ask Sakhsam" />
                  <NavLink href="/user/ml" label="Predict Disease" />
                  <NavLink href="/user/reports" label="Appointments" />
                  <NavLink href="/user/pathlab-reports" label="Reports" />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-[20px] font-medium transition-colors hover:text-black dark:hover:text-purple-300"
    >
      {label}
    </Link>
  );
}
