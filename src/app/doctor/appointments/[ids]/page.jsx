"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Download, PlusCircle } from "lucide-react";
import DocNav from "@/components/DocNavbar";
import Footer from "@/components/UserFooter";
const medicationsByDate = {
  "2025-04-06": [
    { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
  ],
  "2025-04-05": [
    { name: "Ibuprofen", dosage: "200mg", frequency: "Thrice a day" },
  ],
};

const reports = [
  { date: "2025-04-06", name: "Blood Test.pdf" },
  { date: "2025-04-05", name: "X-ray Report.pdf" },
];

export default function DoctorAppointmentPage() {
  const [selectedTab, setSelectedTab] = useState("Medications");
  const [selectedDate, setSelectedDate] = useState("2025-04-06");
  const [sendMedications, setSendMedications] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", frequency: "" });

  const handleAddMedication = () => {
    if (newMed.name && newMed.dosage && newMed.frequency) {
      setSendMedications([...sendMedications, newMed]);
      setNewMed({ name: "", dosage: "", frequency: "" });
    }
  };

  const handleDeleteMedication = (index) => {
    const updatedMeds = [...sendMedications];
    updatedMeds.splice(index, 1);
    setSendMedications(updatedMeds);
  };

  const tabButton = (label) => (
    <Button
      variant="outline"
      className={`w-full text-base font-medium shadow-none border-none rounded-2xl px-4 py-2 transition-all duration-300 ${
        selectedTab === label ? "bg-[#9D4DFF] text-white" : "bg-white text-black"
      }`}
      onClick={() => setSelectedTab(label)}
    >
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <DocNav />
      <div className="flex-1 p-6 bg-white flex gap-6">
        {/* Sidebar */}
        <div className="w-1/3 space-y-4">
          <Card className="bg-[#F7EBFF] p-4 rounded-2xl">
            <CardContent className="space-y-2">
              <h2 className="text-xl font-bold text-[#9D4DFF]">Appointment Details</h2>
              <p><span className="font-semibold">Patient Name:</span> John Doe</p>
              <p><span className="font-semibold">Doctor Name:</span> Dr. Sakhsam Verma</p>
              <p><span className="font-semibold">Date:</span> 2025-04-06</p>
              <p><span className="font-semibold">Disease:</span> Flu and Fever</p>
            </CardContent>
          </Card>
          {tabButton("Chat")}
          {tabButton("Medications")}
          {tabButton("Send Medication")}
          {tabButton("View Reports")}
          {tabButton("Zoom Meeting")}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {selectedTab === "Medications" && (
            <Card className="bg-[#F7EBFF] p-6 rounded-2xl">
              <CardContent>
                <h2 className="text-2xl font-semibold text-[#9D4DFF] mb-4">Medications</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Select onValueChange={setSelectedDate} defaultValue={selectedDate}>
                    <SelectTrigger className="w-[200px] bg-white border border-gray-300 rounded-md">
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {Object.keys(medicationsByDate).map((date) => (
                        <SelectItem key={date} value={date}>{date}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="overflow-auto max-h-60">
                  <table className="min-w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr className="bg-[#D7A9FF] text-black">
                        <th className="p-2">Name</th>
                        <th className="p-2">Dosage</th>
                        <th className="p-2">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicationsByDate[selectedDate]?.map((med, index) => (
                        <tr key={index} className="bg-white text-black">
                          <td className="p-2">{med.name}</td>
                          <td className="p-2">{med.dosage}</td>
                          <td className="p-2">{med.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="bg-[#9D4DFF] text-white flex gap-2 px-4 py-2 rounded-md shadow-md">
                    <Download className="h-4 w-4" /> Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === "Send Medication" && (
            <Card className="bg-[#F7EBFF] p-6 rounded-2xl">
              <CardContent className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#9D4DFF]">Send Medication</h2>
                <div className="flex gap-2">
                  <input className="border p-2 rounded-md" placeholder="Medication Name" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} />
                  <input className="border p-2 rounded-md" placeholder="Dosage" value={newMed.dosage} onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })} />
                  <input className="border p-2 rounded-md" placeholder="Frequency" value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })} />
                  <Button onClick={handleAddMedication} className="bg-[#9D4DFF] text-white"><PlusCircle className="w-4 h-4" /></Button>
                </div>
                <table className="min-w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-[#D7A9FF] text-black">
                      <th className="p-2">Name</th>
                      <th className="p-2">Dosage</th>
                      <th className="p-2">Frequency</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sendMedications.map((med, index) => (
                      <tr key={index} className="bg-white text-black">
                        <td className="p-2">{med.name}</td>
                        <td className="p-2">{med.dosage}</td>
                        <td className="p-2">{med.frequency}</td>
                        <td className="p-2">
                          <Button onClick={() => handleDeleteMedication(index)} className="bg-red-500 text-white px-3 py-1 text-sm">Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right">
                  <Button
                    onClick={() => {
                      if (sendMedications.length === 0) {
                        alert("Please add at least one medication before sending.");
                        return;
                      }
                      alert("Medications sent successfully!");
                      setSendMedications([]);
                    }}
                    className="bg-[#9D4DFF] text-white mt-4"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedTab === "View Reports" && (
            <Card className="bg-[#F7EBFF] p-6 rounded-2xl">
              <CardContent className="space-y-4">
                <h2 className="text-2xl font-semibold text-[#9D4DFF]">Uploaded Reports</h2>
                <table className="min-w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-[#D7A9FF] text-black">
                      <th className="p-2">Date</th>
                      <th className="p-2">Report Name</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index} className="bg-white text-black">
                        <td className="p-2">{report.date}</td>
                        <td className="p-2">{report.name}</td>
                        <td className="p-2 space-x-2">
                          <Button className="bg-[#9D4DFF] text-white px-3 py-1 text-sm">View</Button>
                          <Button className="bg-[#9D4DFF] text-white px-3 py-1 text-sm">Download</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {selectedTab === "Chat" && (
            <Card className="bg-[#F7EBFF] p-6 rounded-2xl">
              <CardContent>
                <h2 className="text-xl font-semibold text-[#9D4DFF]">Chat with your Doctor</h2>
                <p className="mt-2 text-sm">Coming soon...</p>
              </CardContent>
            </Card>
          )}

          {selectedTab === "Zoom Meeting" && (
            <Card className="bg-[#F7EBFF] p-6 rounded-2xl">
              <CardContent>
                <h2 className="text-xl font-semibold text-[#9D4DFF]">Zoom Meeting</h2>
                <p className="mt-2 text-sm">Coming soon...</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
