"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
export default function AppointmentDetails() {
  const [activeSection, setActiveSection] = useState("chat");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [uploadedReports, setUploadedReports] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const medicationData = [
    {
      date: "2025-04-06",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-07",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-08",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-09",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2015-09-05",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-10",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-11",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-12",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
    {
      date: "2025-04-13",
      medications: [
        {
          name: "Amoxicillin",
          dosage: "250mg",
          frequency: "Three times a day",
        },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice a day" },
        { name: "Vitamin C", dosage: "1000mg", frequency: "Once a day" },
      ],
    },
  ];

  const fileInputRef = useRef(null);

  const handleReportUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newReports = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setUploadedReports((prev) => [...prev, ...newReports]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [messages, setMessages] = useState([
    {
      text: "Hello, Doctor!",
      sender: "user",
      time: new Date().toLocaleTimeString(),
    },
    {
      text: "Hi, how are you feeling today?",
      sender: "doctor",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      text: messageInput,
      sender: "user",
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleSelectChange = (date) => {
    const med = medicationData.find((m) => m.date === date);
    setSelectedMedication(med);
  };
  const handleDownloadPdf = () => {
    if (!selectedMedication) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Medication Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Date: ${selectedMedication.date}`, 14, 25);

    // Table headers and rows
    const headers = [["Name", "Dosage", "Frequency"]];
    const rows = selectedMedication.medications.map((m) => [
      m.name,
      m.dosage,
      m.frequency,
    ]);

    // Using autoTable for cleaner layout (if installed)
    autoTable(doc, {
      startY: 35,
      head: headers,
      body: rows,
    });

    // Save PDF
    doc.save(`Medication_${selectedMedication.date}.pdf`);
  };

  if (!isClient) return null;

  return (
    <>
      <UserNavbar />
      <div className="p-4 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Appointment Info */}
            <Card className="bg-purple-100 dark:bg-purple-900">
              <CardContent className="p-4 space-y-1">
                <h2 className="text-xl font-bold text-purple-800 dark:text-purple-100">
                  Appointment Details
                </h2>
                <p>
                  <strong>Patient Name:</strong> John Doe
                </p>
                <p>
                  <strong>Doctor Name:</strong> Dr. Sakhsam Verma
                </p>
                <p>
                  <strong>Date:</strong> 2025-04-06
                </p>
                <p>
                  <strong>Disease:</strong> Flu and Fever
                </p>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              {["chat", "medications", "reports", "zoom"].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "outline"}
                  className="w-full capitalize"
                  onClick={() => setActiveSection(section)}
                >
                  {section === "reports"
                    ? "Upload Reports"
                    : section === "zoom"
                    ? "Zoom Meeting"
                    : section}
                </Button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 space-y-4">
            {activeSection === "chat" && (
              <Card className="bg-purple-100 dark:bg-purple-900">
                <CardContent className="p-4 space-y-3">
                  <h2 className="text-xl justify-center text-center font-semibold text-purple-800 dark:text-purple-100">
                    Chat with Dr. Sakhsam Verma
                  </h2>
                  <div className="h-80 overflow-y-auto bg-white dark:bg-purple-950 rounded-md p-2 space-y-2">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`text-sm p-2 rounded w-fit ${
                          msg.sender === "user"
                            ? "bg-pink-300 dark:bg-purple-800 ml-auto text-right"
                            : "bg-purple-300 dark:bg-purple-700 ml-auto text-left"
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {msg.time}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "medications" && (
              <Card className="bg-purple-100 dark:bg-purple-900">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-100 mb-4">
                    Medications
                  </h2>

                  {/* Date Dropdown */}
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[200px] bg-white dark:bg-purple-800 border-purple-300 dark:border-purple-700 mb-4">
                      <SelectValue placeholder="Select a date" />
                    </SelectTrigger>
                    <SelectContent>
                      {medicationData.map((med, index) => (
                        <SelectItem key={index} value={med.date}>
                          {med.date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Show Medications when a date is selected */}
                  {selectedMedication && (
                    <Tabs defaultValue="details" className="mt-6">
                      <TabsList>
                        <TabsTrigger value="details">
                          View Medications
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="details">
                        <div className="overflow-x-auto mt-2 max-h-50 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-purple-300 dark:bg-purple-800">
                              <tr>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Dosage</th>
                                <th className="p-2 text-left">Frequency</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-purple-950">
                              {selectedMedication.medications.map((m, idx) => (
                                <tr key={idx} className="border-b">
                                  <td className="p-2">{m.name}</td>
                                  <td className="p-2">{m.dosage}</td>
                                  <td className="p-2">{m.frequency}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <Button
                          className="mt-3 flex gap-2 items-center"
                          onClick={handleDownloadPdf}
                        >
                          <Download className="w-4 h-4" /> Download PDF
                        </Button>
                      </TabsContent>
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "reports" && (
              <Card className="bg-purple-100 dark:bg-purple-900">
                <CardContent className="p-4 space-y-4">
                  <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-100">
                    Upload Reports
                  </h2>
                  <Input
                    type="file"
                    multiple
                    onChange={handleReportUpload}
                    className="bg-white dark:bg-purple-950"
                    ref={(ref) => (fileInputRef.current = ref)}
                  />

                  {/* Uploaded Reports List with Scroll */}
                  {uploadedReports.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-purple-700 dark:text-purple-200">
                        Uploaded Files:
                      </h3>
                      <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                        {uploadedReports.map((file, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center bg-white dark:bg-purple-950 p-2 rounded shadow"
                          >
                            <span className="truncate">{file.name}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(file.url, "_blank")}
                            >
                              See
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "zoom" && (
              <Card className="bg-purple-100 dark:bg-purple-900">
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-100">
                    Join Video Call
                  </h2>
                  <p className="text-sm text-purple-700 dark:text-purple-200">
                    Click below to join your scheduled video consultation.
                  </p>
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">
                    Join Zoom Meeting
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <UserFooter />
    </>
  );
}
