"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Stethoscope, AlertCircle, FileText } from "lucide-react";
import { useState } from "react";
import DocNav from "@/components/DocNavbar";
import UserFooter from "@/components/UserFooter";

export default function DoctorHomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="flex flex-col min-h-screen bg-violet-50">
      <DocNav/>
      <Tabs defaultValue="appointments" className="w-full col-span-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" id="appointments">
          <Card className="bg-violet-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="text-purple-600" /> Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between"><span>John Doe - 10:30 AM</span><Button variant="outline">Join</Button></li>
                <li className="flex justify-between"><span>Jane Smith - 12:00 PM</span><Button variant="outline">Join</Button></li>
                <li className="flex justify-between"><span>Akshay Mehta - 1:30 PM</span><Button variant="outline">Join</Button></li>
                <li className="flex justify-between"><span>Ravi Kumar - 3:00 PM</span><Button variant="outline">Join</Button></li>
                <li className="flex justify-between"><span>Anita Desai - 4:15 PM</span><Button variant="outline">Join</Button></li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" id="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card className="bg-violet-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="text-purple-600" /> Recent Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>🟢 John Doe - Diabetes Checkup (2 days ago)</li>
                  <li>🟢 Jane Smith - Follow-up (3 days ago)</li>
                  <li>🟡 Rohit Sharma - Blood Pressure (1 week ago)</li>
                  <li>🔴 Priya Verma - High Fever (10 days ago)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-violet-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📅 Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card className="bg-violet-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="text-purple-600" /> Disease Spread News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-2">
                  <li>🔴 Rising Dengue cases reported in Delhi NCR.</li>
                  <li>🟡 Seasonal Flu spikes seen across urban areas.</li>
                  <li>🟢 Covid-19 low risk, no surge currently.</li>
                  <li>🟠 Cholera alert in coastal villages.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-violet-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="text-purple-600" /> Submitted Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li><strong>John Doe:</strong> Blood Test Report (Uploaded 2 days ago)</li>
                <li><strong>Jane Smith:</strong> X-ray - Chest (Uploaded 4 days ago)</li>
                <li><strong>Rohit Sharma:</strong> ECG Report (Uploaded 1 week ago)</li>
                <li><strong>Priya Verma:</strong> Covid Test (Uploaded 10 days ago)</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <UserFooter/>
    </div>
  );
}
