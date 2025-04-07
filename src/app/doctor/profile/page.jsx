"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DocNav from "@/components/DocNavbar";

export default function DoctorHomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "Dr. John Smith",
    email: "dr.john@example.com",
    phone: "+91 9876543210",
    specialization: "Cardiologist",
    qualification: "MBBS, MD (Cardiology)",
    experience: "10 years",
    hospital: "City Care Hospital, Mumbai",
    address: "123 Marine Drive, Mumbai",
    languages: "English, Hindi, Marathi",
    consultationFees: "₹1000",
    achievements: "Recipient of Best Cardiologist Award 2023",
    college: "AIIMS Delhi",
    pastHospitals: "Apollo Hospital, Fortis Hospital"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100">
        {/* Navbar */}
        <DocNav />

        {/* Doctor Profile */}
        <section className="flex flex-col md:flex-row justify-center items-start gap-10 px-6 py-12">
          <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl shadow-md w-full md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-24 h-24 border-4 border-purple-400">
                <AvatarImage src="/profile.jpg" alt="Doctor" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
            </div>
            <div className="space-y-3">
              <div><strong>Name:</strong> {isEditing ? <input name="name" value={doctorInfo.name} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.name}</div>
              <div><strong>Email:</strong> {isEditing ? <input name="email" value={doctorInfo.email} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.email}</div>
              <div><strong>Phone:</strong> {isEditing ? <input name="phone" value={doctorInfo.phone} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.phone}</div>
              <div><strong>Hospital:</strong> {isEditing ? <input name="hospital" value={doctorInfo.hospital} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.hospital}</div>
              <div><strong>Address:</strong> {isEditing ? <input name="address" value={doctorInfo.address} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.address}</div>
              <div><strong>Languages:</strong> {isEditing ? <input name="languages" value={doctorInfo.languages} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.languages}</div>
              <div><strong>Consultation Fees:</strong> {isEditing ? <input name="consultationFees" value={doctorInfo.consultationFees} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.consultationFees}</div>
            </div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl shadow-md w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Doctor Qualification</h2>
            <div className="space-y-3">
              <div><strong>Specialization:</strong> {isEditing ? <input name="specialization" value={doctorInfo.specialization} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.specialization}</div>
              <div><strong>Qualification:</strong> {isEditing ? <input name="qualification" value={doctorInfo.qualification} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.qualification}</div>
              <div><strong>Experience:</strong> {isEditing ? <input name="experience" value={doctorInfo.experience} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.experience}</div>
              <div><strong>Achievements:</strong> {isEditing ? <input name="achievements" value={doctorInfo.achievements} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.achievements}</div>
              <div><strong>College Studied:</strong> {isEditing ? <input name="college" value={doctorInfo.college} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.college}</div>
              <div><strong>Past Hospital Experience:</strong> {isEditing ? <input name="pastHospitals" value={doctorInfo.pastHospitals} onChange={handleChange} className="ml-2 p-1 rounded text-black" /> : doctorInfo.pastHospitals}</div>
            </div>
            {isEditing && <Button className="mt-6" onClick={() => setIsEditing(false)}>Save Changes</Button>}
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}