"use client";


import {  Download, Eye } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import DocNav from "@/components/DocNavbar";
import Footer from "@/components/UserFooter";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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

        <section className="px-6 py-10">
          <h2 className="text-3xl font-bold mb-6">Recent Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAppointments.map((patient, index) => (
              <div key={index} className="bg-white dark:bg-purple-900 p-5 rounded-xl shadow">
                <h4 className="text-xl font-semibold mb-1">{patient.name}</h4>
                <p className="text-purple-700 dark:text-purple-300 mb-3">Disease: {patient.disease}</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      const blob = new Blob([
                        `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Prescription</title></head><body><h2>Medication Report for ${patient.name}</h2><table border='1' cellpadding='8' cellspacing='0'><tr><th>Name</th><th>Dosage</th><th>Frequency</th></tr>${medicineList.map(med => `<tr><td>${med.name}</td><td>${med.dosage}</td><td>${med.frequency}</td></tr>`).join('')}</table></body></html>`
                      ], { type: 'application/pdf' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${patient.name}_prescription.pdf`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    variant="link"
                    className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          const newWindow = window.open();
                          newWindow.document.write(`<!DOCTYPE html><html><head><meta charset='utf-8'><title>Prescription</title></head><body><h2>Medication Report for ${patient.name}</h2><table border='1' cellpadding='8' cellspacing='0'><tr><th>Name</th><th>Dosage</th><th>Frequency</th></tr>${medicineList.map(med => `<tr><td>${med.name}</td><td>${med.dosage}</td><td>${med.frequency}</td></tr>`).join('')}</table></body></html>`);
                          newWindow.document.close();
                        }}
                        variant="link"
                        className="p-0 text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
                      >
                        <Eye className="w-4 h-4" /> View
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className="px-6 py-10">
          <h2 className="text-3xl font-bold mb-6">Schedule & Holidays</h2>
          <div className="bg-white dark:bg-purple-900 p-6 rounded-xl shadow max-w-md mx-auto">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              modifiers={{ holiday: holidays.map(date => new Date(date)) }}
              modifiersClassNames={{ holiday: "bg-red-200 text-red-800" }}
            />
            <div className="mt-4 text-sm">
              <strong>Holidays:</strong>
              <ul className="list-disc ml-6 mt-1">
                {holidays.map((day, i) => (
                  <li key={i}>{day}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <Footer/>
      </div>
    </TooltipProvider>
  );
}
