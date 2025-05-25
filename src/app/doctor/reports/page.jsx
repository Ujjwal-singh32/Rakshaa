"use client";

import { useEffect, useState } from "react";
import { Download, Eye } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import DocNav from "@/components/DocNavbar";
import DoctorFooter from "@/components/DocFooter";
import { useDoctor } from "@/context/doctorContext"; // Update path if needed
import axios from "axios";

export default function DoctorDashboard() {
  const { doctorId, loading } = useDoctor();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (!doctorId) return;

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("drtoken");
        const res = await axios.get(`/api/doctor/all-reports?doctorId=${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (res.data.success) {
          setReports(res.data.reports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [doctorId]);

  // Group reports by patient name
  const groupedReports = reports.reduce((acc, report) => {
    acc[report.patientName] = acc[report.patientName] || [];
    acc[report.patientName].push(report);
    return acc;
  }, {});

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-100">
        <DocNav />

        <section className="px-6 py-10">
          <h2 className="text-3xl font-bold mb-6">Submitted Reports</h2>
          {Object.entries(groupedReports).map(([patientName, reports]) => (
            <div key={patientName} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{patientName}</h3>
              <div className="space-y-4">
                {reports.map((report, index) => (
                  <div key={index} className="bg-white dark:bg-purple-900 p-5 rounded-xl shadow">
                    <p className="text-purple-700 dark:text-purple-300 mb-2">
                      Disease: {report.disease}
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => {
                          const blob = new Blob([
                            `<html><head><meta charset='utf-8'></head><body><h2>Medical Report for ${patientName}</h2><p><strong>Disease:</strong> ${report.disease}</p></body></html>`
                          ], { type: 'application/pdf' });

                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = report.reportName || "report.pdf";
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
                            `<html><head><meta charset='utf-8'></head><body><h2>Medical Report for ${patientName}</h2><p><strong>Disease:</strong> ${report.disease}</p></body></html>`
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
            </div>
          ))}
        </section>

        <DoctorFooter />
      </div>
    </TooltipProvider>
  );
}
