"use client";

import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import UserNavbar from "@/components/UserNavbar";
import UserFooter from "@/components/UserFooter";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Send } from "lucide-react";
import { toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
export default function AppointmentDetails() {
  const [activeSection, setActiveSection] = useState("chat");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [uploadedReports, setUploadedReports] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [receivedMedication, setReceivedMedication] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const res = await axios.post("/api/booking/detailsbyId", {
          bookingId: id,
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

    if (id) {
      fetchBookingDetails();
    }
  }, [id]);
  
    if (loading || !booking || !user || !booking.doctorId) {
    return <div>Loading appointment details...</div>;
  }
  const receiverId = booking.doctorId;
  const senderId = user._id;

  useEffect(() => {
    setIsClient(true);
  }, []);
  const socket = useRef(
    io("http://localhost:3001", {
      autoConnect: false,
      auth: {
        token: localStorage.getItem("token") || "",
      },
    })
  ).current;

  const fileInputRef = useRef(null);

  const handleReportUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newReports = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));
    setUploadedReports((prev) => [...prev, ...newReports]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [messageInput, setMessageInput] = useState("");

  const handleSelectChange = (date) => {
    const med = receivedMedication.find((m) => m.date === date);
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

  useEffect(() => {
    if (!selectedDate) return;

    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `/api/appointments/doctors?date=${selectedDate}`
        );
        const data = await res.json();
        setAvailableDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      }
    };

    fetchDoctors();
  }, [selectedDate]);

  const handleReceiveMedication = async () => {
    if (!selectedDoctorId || !selectedDate || !user?._id) {
      toast.error("Please select a doctor and date.");
      return;
    }

    try {
      const res = await fetch("/api/medication/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          patientId: user._id,
          date: selectedDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Medication fetched successfully!");
        setReceivedMedication(data.medication);
      } else {
        toast.error(data.message || "Failed to receive medication.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleSendReports = async () => {
    if (uploadedReports.length === 0) {
      alert("Please upload at least one report before sending.");
      return;
    }
    const patientId = user._id;
    const doctorId = booking.doctorId;

    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("doctorId", doctorId);

    uploadedReports.forEach((file) => {
      formData.append("reports", file instanceof File ? file : file.file);
    });

    try {
      const response = await axios.post("/api/user/send-reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Reports Sent");
        setUploadedReports([]);
      } else {
        toast.success("Failed to Send Reports");
      }
    } catch (error) {
      console.error("Error sending reports:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "chat") {
      socket.connect();

      // Join room with both participants
      socket.emit("join", { userId: senderId });

      // Listen for incoming messages
      socket.on("newMessage", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [activeSection, senderId]);

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;

    const newMessage = {
      text: messageInput,
      sender: senderId,
      receiverId: receiverId,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Emit message to server
    socket.emit("sendMessage", {
      to: receiverId,
      message: newMessage,
    });

    // Append to current UI
    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isClient) return null;
  // console.log("booking", booking);
  if (!isClient || loading || !booking) {
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
                  <strong>Patient Name:</strong>{" "}
                  {user ? user.name : "patient name loading!!"}
                </p>
                <p>
                  <strong>Doctor Name:</strong>{" "}
                  {booking.doctorName || "doctor name loading !!"}
                </p>
                <p>
                  <strong>Date: </strong>
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
                    Chat with Dr.{booking.doctorName || "name loading!!"}
                  </h2>

                  <div className="h-80 overflow-y-auto bg-white dark:bg-purple-950 rounded-md p-2 space-y-2">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`text-sm p-2 rounded w-fit ${
                          msg.sender === senderId
                            ? "bg-pink-300 dark:bg-purple-800 ml-auto text-right"
                            : "bg-purple-300 dark:bg-purple-700 mr-auto text-left"
                        }`}
                      >
                        <p>{String(msg.text)}</p>

                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {msg.time}
                        </p>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
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
                      {receivedMedication.map((med, index) => (
                        <SelectItem key={index} value={med.date}>
                          {med.date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Show Medications when a date is selected */}
                  {/* Doctor and Date Selection Section */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-6">
                    {/* Doctor Dropdown */}
                    <Select
                      onValueChange={(value) => setSelectedDoctorId(value)}
                    >
                      <SelectTrigger className="w-[200px] bg-white dark:bg-purple-800 border-purple-300 dark:border-purple-700">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDoctors.map((doctor) => (
                          <SelectItem key={doctor._id} value={doctor._id}>
                            {doctor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Date Dropdown */}
                    <Select onValueChange={(value) => setSelectedDate(value)}>
                      <SelectTrigger className="w-[200px] bg-white dark:bg-purple-800 border-purple-300 dark:border-purple-700">
                        <SelectValue placeholder="Select Date" />
                      </SelectTrigger>
                      <SelectContent>
                        {receivedMedication.map((med, idx) => (
                          <SelectItem key={idx} value={med.date}>
                            {med.date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Fetch Medication Button */}
                    <Button
                      className="bg-purple-600 text-white hover:bg-purple-700"
                      onClick={handleReceiveMedication}
                    >
                      Fetch Medication
                    </Button>
                  </div>

                  {/* Show Medication Table if Data Exists */}
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
              <>
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
                        <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
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

                {/* Send Button */}
                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    onClick={handleSendReports}
                  >
                    <Send className="w-4 h-4" />
                    Send Reports
                  </Button>
                </div>
              </>
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
