"use client";

import {  Download, Eye } from "lucide-react";
import {  TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import DocNav from "@/components/DocNavbar";
import Footer from "@/components/UserFooter";


export default function DoctorDashboard() {
  const [date, setDate] = useState(new Date());
  const holidays = ["2025-04-14", "2025-04-25", "2025-05-01"];

  const recentAppointments = [
    {
      name: "Ravi Kumar",
      disease: "Flu",
    },
    {
      name: "Anjali Sharma",
      disease: "Dengue",
    },
    {
      name: "Amit Verma",
      disease: "Chikungunya",
    },
  ];

  const upcomingAppointments = [
    {
      name: "Rahul Sen",
      date: "2025-04-10",
      time: "10:00 AM",
      department: "Cardiology",
    },
    {
      name: "Priya Mehra",
      date: "2025-04-11",
      time: "02:30 PM",
      department: "Neurology",
    },
    {
      name: "Mohit Jain",
      date: "2025-04-12",
      time: "11:15 AM",
      department: "Dermatology",
    },
  ];

  const submittedReports = [
    {
      name: "Ravi Kumar",
      disease: "Flu",
      report: "Flu_Report.pdf",
    },
    {
      name: "Anjali Sharma",
      disease: "Dengue",
      report: "Dengue_Report.pdf",
    },
    {
      name: "Amit Verma",
      disease: "Chikungunya",
      report: "Chikungunya_Report.pdf",
    },
  ];

  const medicineList = [
    { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
    { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
    { name: "Azithromycin", dosage: "250mg", frequency: "Once a day" },
    { name: "Cetirizine", dosage: "10mg", frequency: "Once at night" },
    { name: "Ibuprofen", dosage: "400mg", frequency: "Twice a day" },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100">
        {/* Navbar */}
        <DocNav />


        {/* Report Submitted by Patients */}
        <section className="px-6 py-10">
          <h2 className="text-3xl font-bold mb-6">Submitted Reports</h2>
          <div className="space-y-4">
            {submittedReports.map((report, index) => (
              <div key={index} className="bg-white dark:bg-purple-900 p-5 rounded-xl shadow">
                <h4 className="text-xl font-semibold mb-1">{report.name}</h4>
                <p className="text-purple-700 dark:text-purple-300 mb-2">Disease: {report.disease}</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      const blob = new Blob([
                        `<html><head><meta charset='utf-8'></head><body><h2>Medical Report for ${report.name}</h2><p><strong>Disease:</strong> ${report.disease}</p><h3>Test Results:</h3><ul><li>Fever: 102°F</li><li>WBC Count: Elevated</li><li>Platelet Count: Normal</li></ul></body></html>`
                      ], { type: 'application/pdf' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = report.report;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    variant="link"
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>

                  <Button
                    onClick={() => {
                      const newWindow = window.open();
                      newWindow.document.write(
                        `<html><head><meta charset='utf-8'></head><body><h2>Medical Report for ${report.name}</h2><p><strong>Disease:</strong> ${report.disease}</p><h3>Test Results:</h3><ul><li>Fever: 102°F</li><li>WBC Count: Elevated</li><li>Platelet Count: Normal</li></ul></body></html>`
                      );
                      newWindow.document.close();
                    }}
                    variant="link"
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
                  >
                    <Eye className="w-4 h-4" /> View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

       
        <Footer/>
      </div>
    </TooltipProvider>
  );
}