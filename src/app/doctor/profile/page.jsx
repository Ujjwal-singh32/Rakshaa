"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DocNav from "@/components/DocNavbar";
import Footer from "@/components/UserFooter";

export default function DoctorProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-violet-50 ">
      <DocNav/>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-2.5">
        {/* Profile Overview */}
        <Card className="bg-violet-100 col-span-1">
          <CardHeader>
            <CardTitle className="text-center">Doctor Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/doctor-avatar.jpg" alt="Doctor" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-lg font-semibold">Dr. Arjun Mehta</h2>
              <p className="text-sm text-muted-foreground">Cardiologist</p>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Editable Profile Info */}
        <Card className="bg-violet-100 col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input type="text" defaultValue="Dr. Arjun Mehta" />
            </div>
            <div>
              <label className="text-sm font-medium">Specialization</label>
              <Input type="text" defaultValue="Cardiologist" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" defaultValue="arjun.mehta@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input type="tel" defaultValue="+91 9876543210" />
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea defaultValue="Experienced Cardiologist with 10+ years in top hospitals. Specialized in heart surgeries and preventive care." />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Changes</Button>
          </CardContent>
        </Card>
        <Footer/>
      </div>
    </div>
  );
}
