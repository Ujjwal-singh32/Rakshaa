"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import DocNav from "@/components/DocNavbar";
import UserFooter from "@/components/UserFooter";
import { useRef, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";
export default function AppointmentDetails() {
  const { ids } = useParams();
  const [activeSection, setActiveSection] = useState("chat");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medicationData, setMedicationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const fetchMeds = async () => {
      const res = await fetch(`/api/medications?patientId=12345`);
      const data = await res.json();
      setMedicationData(data.medications);
    };

    fetchMeds();
  }, []);

  const fileInputRef = useRef(null);

  const [uploadedReports, setUploadedReports] = useState([
    {
      name: "Blood_Test_Report.pdf",
      url:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "X-Ray_Result.png",
      url: "https://via.placeholder.com/800x600.png?text=X-Ray+Image",
    },
    {
      name: "MRI_Scan_Report.pdf",
      url:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "Blood_Test_Report.pdf",
      url:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      name: "X-Ray_Result.png",
      url: "https://via.placeholder.com/800x600.png?text=X-Ray+Image",
    },
    {
      name: "MRI_Scan_Report.pdf",
      url:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ]);
  const [booking, setBooking] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [newMedications, setNewMedications] = useState([
    { name: "", dosage: "", frequency: "" },
  ]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axios.post("/api/booking/detailsbyId", {
          bookingId: ids,
        });

        if (res.data.success) {
          setBooking(res.data.booking);
        } else {
          console.error("Failed to fetch booking details:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ids) {
      fetchBookingDetails();
    }
  }, [ids]);

  if (
    loading ||
    !booking ||
    !booking.doctorId.name ||
    !booking.patientId.name
  ) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-400 border-dashed rounded-full animate-spin dark:border-purple-300"></div>
          <p className="text-purple-700 dark:text-purple-200 text-lg font-semibold animate-pulse">
            Loading Appointment Details...
          </p>
        </div>
      </div>
    );
  }

  const handleAddMedication = () => {
    setNewMedications([
      ...newMedications,
      { name: "", dosage: "", frequency: "" },
    ]);
  };

  const handleRemoveMedication = (index) => {
    const updated = [...newMedications];
    updated.splice(index, 1);
    setNewMedications(updated);
  };

  const handleMedicationChange = (index, field, value) => {
    const updated = [...newMedications];
    updated[index][field] = value;
    setNewMedications(updated);
  };

  const handleSubmitMedications = async () => {
    try {
      const res = await fetch("/api/medications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId: "12345", // replace with actual patient ID or email
          medications: newMedications,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Medications sent to patient!");
      } else {
        alert("Failed to send medications");
      }
    } catch (error) {
      console.error("Error sending medications:", error);
      alert("Error sending medications");
    }
  };

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
  const handleMarkCompleted = async () => {
    try {
      const res = await axios.post("/api/booking/markcomplete", {
        bookingId: ids,
      });
      if (res.data.success) {
        toast.success("Status Updated");
        router.push("/doctor/appointments");
      } else {
        toast.error("Error Occured");
      }
    } catch (error) {
      toast.error("Error Occured");
      console.log(error);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <DocNav />
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
                  <strong>Patient Name:</strong>{" "}
                  {booking.patientId.name
                    ? booking.patientId.name
                    : "patient name loading!!"}
                </p>
                <p>
                  <strong>Doctor Name:</strong>
                  {booking.doctorId.name
                    ? booking.doctorId.name
                    : "Doctor name loading!!"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <strong>Disease:</strong>{" "}
                  {booking.disease || "disease loading"}
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleMarkCompleted}
                    className="w-full sm:w-auto px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 transition-colors duration-300"
                  >
                    Mark as Completed
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              {[
                "chat",
                "medications",
                "send Medication",
                "reports",
                "zoom",
              ].map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "outline"}
                  className="w-full capitalize"
                  onClick={() => setActiveSection(section)}
                >
                  {section === "reports"
                    ? "View Reports"
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
                    Chat with John Doe
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
                    Uploaded Reports
                  </h2>
                  {uploadedReports.length > 0 ? (
                    <div className="space-y-2">
                      <h3 className="font-medium text-purple-700 dark:text-purple-200">
                        Available Files:
                      </h3>
                      <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                        {uploadedReports.map((file, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center bg-white dark:bg-purple-950 p-2 rounded shadow"
                          >
                            <span className="truncate">{file.name}</span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(file.url, "_blank")}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const link = document.createElement("a");
                                  link.href = file.url;
                                  link.setAttribute("download", file.name); // Ensure file name is set
                                  link.setAttribute("target", "_blank"); // Optional: open in new tab
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                              >
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-purple-700 dark:text-purple-200">
                      No reports available.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
            {activeSection === "send Medication" && (
              <Card className="bg-purple-100 dark:bg-purple-900">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-100 mb-4">
                    Send Medication
                  </h2>

                  <div className="overflow-x-auto max-h-64 overflow-y-auto rounded-md">
                    <table className="w-full text-sm bg-white dark:bg-purple-950 rounded-md">
                      <thead className="bg-purple-300 dark:bg-purple-800 sticky top-0">
                        <tr>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Dosage</th>
                          <th className="p-2 text-left">Frequency</th>
                          <th className="p-2 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newMedications.map((med, idx) => (
                          <tr key={idx} className="border-b border-purple-200">
                            <td className="p-2">
                              <Input
                                value={med.name}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    idx,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="bg-white dark:bg-purple-800"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                value={med.dosage}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    idx,
                                    "dosage",
                                    e.target.value
                                  )
                                }
                                className="bg-white dark:bg-purple-800"
                              />
                            </td>
                            <td className="p-2">
                              <Input
                                value={med.frequency}
                                onChange={(e) =>
                                  handleMedicationChange(
                                    idx,
                                    "frequency",
                                    e.target.value
                                  )
                                }
                                className="bg-white dark:bg-purple-800"
                              />
                            </td>
                            <td className="p-2">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemoveMedication(idx)}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button onClick={handleAddMedication}>Add Row</Button>
                    <Button onClick={handleSubmitMedications} variant="default">
                      Send to Patient
                    </Button>
                  </div>
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
