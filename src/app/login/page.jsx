"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { MailIcon, LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
const roles = ["Patient", "Doctor", "Pathlab"];
import { HeartPulse } from "lucide-react"; // Lucide icon
const IconInput = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <Icon size={16} />
    </span>
    <Input className="pl-10 py-6 rounded-full bg-gray-100 text-sm" {...props} />
  </div>
);

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState(null);
  const [step, setStep] = useState(0);
  const router = useRouter();
  // Individual form states
  const [patientData, setPatientData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    profilePic: null,
  });

  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    profilePic: null,
  });

  const [pathlabData, setPathlabData] = useState({
    labName: "",
    email: "",
    password: "",
    phone: "",
    labAddress: "",
    profilePic: null,
  });

  const getFormData = () => {
    if (role === "Patient") return patientData;
    if (role === "Doctor") return doctorData;
    if (role === "Pathlab") return pathlabData;
    return {};
  };

  const setFormData = (data) => {
    if (role === "Patient") setPatientData((prev) => ({ ...prev, ...data }));
    if (role === "Doctor") setDoctorData((prev) => ({ ...prev, ...data }));
    if (role === "Pathlab") setPathlabData((prev) => ({ ...prev, ...data }));
  };

  const handleChange = (field, value) => {
    setFormData({ [field]: value });
  };

  const handleImageChange = (file) => {
    setFormData({ profilePic: file });
  };

  const getSignupSteps = () => {
    switch (role) {
      case "Patient":
        return [
          { label: "Name", field: "name" },
          { label: "Email", field: "email" },
          { label: "Password", field: "password", type: "password" },
          { label: "Age", field: "age" },
          { label: "Phone", field: "phone" },
          { label: "Profile Picture", type: "image" },
        ];
      case "Doctor":
        return [
          { label: "Name", field: "name" },
          { label: "Email", field: "email" },
          { label: "Password", field: "password", type: "password" },
          { label: "Specialization", field: "specialization" },
          { label: "Phone", field: "phone" },
          { label: "Profile Picture", type: "image" },
        ];
      case "Pathlab":
        return [
          { label: "Lab Name", field: "labName" },
          { label: "Email", field: "email" },
          { label: "Password", field: "password", type: "password" },
          { label: "Phone", field: "phone" },
          { label: "Lab Address", field: "labAddress" },
          { label: "Profile Picture", type: "image" },
        ];
      default:
        return [];
    }
  };

  const steps = getSignupSteps();
  const currentData = getFormData();

  const handleLogin = async () => {
    const { email, password } = currentData;

    try {
      if (role === "Patient") {
        await loginPatient(email, password);
      } else if (role === "Doctor") {
        await loginDoctor(email, password);
      } else if (role === "Pathlab") {
        await loginPathlab(email, password);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignup = async () => {
    try {
      if (role === "Patient") {
        await signupPatient(patientData);
      } else if (role === "Doctor") {
        await signupDoctor(doctorData);
      } else if (role === "Pathlab") {
        await signupPathlab(pathlabData);
      }
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  // Dummy API
  const loginPatient = async (email, password) => {
    console.log("Patient Login:", email, password);
    router.push("/user/home");
  };
  const loginDoctor = async (email, password) => {
    console.log("Doctor Login:", email, password);
    router.push("/doctor/home");
  };
  const loginPathlab = async (email, password) => {
    console.log("Pathlab Login:", email, password);
    router.push("/pathlab/home");
  };

  const signupPatient = async (data) => {
    console.log("Patient Signup:", data);
    if (data.profilePic)
      console.log("Patient Image File:", data.profilePic.name);
    router.push("/user/home");
  };
  const signupDoctor = async (data) => {
    console.log("Doctor Signup:", data);
    if (data.profilePic)
      console.log("Doctor Image File:", data.profilePic.name);
    router.push("/doctor/home");
  };
  const signupPathlab = async (data) => {
    console.log("Pathlab Signup:", data);
    if (data.profilePic)
      console.log("Pathlab Image File:", data.profilePic.name);
    router.push("/pathlab/home");
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setStep(0);
  };

  const FloatingBlobs = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute w-96 h-96 bg-purple-400 opacity-40 rounded-full top-10 left-10 animate-float1 blur-[100px]" />
      <div className="absolute w-[500px] h-[500px] bg-pink-400 opacity-40 rounded-full top-[60%] right-[-100px] animate-float2 blur-[120px]" />
      <div className="absolute w-80 h-80 bg-blue-400 opacity-40 rounded-full bottom-[-100px] left-[40%] animate-float3 blur-[100px]" />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-200 via-purple-100 to-blue-100 p-4">
      <FloatingBlobs />
      <div className="flex flex-col md:flex-row w-full max-w-6xl h-auto md:h-[90vh] overflow-hidden rounded-3xl shadow-2xl backdrop-blur-xl bg-white/80">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-blue-700 via-purple-700 to-pink-500 relative items-center justify-center p-4">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/024/585/326/small/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png"
            alt="doctor"
            className="w-[80%] max-h-[80%] object-contain"
          />
        </div>

        <div className="w-full md:flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-gradient-to-tr from-purple-200 via-purple-100 to-blue-100">
          <div className="w-full max-w-md mx-auto">
            {!role ? (
              <>
                {" "}
                <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-6 tracking-widest drop-shadow-lg flex items-center justify-center gap-3">
                  <span className="animate-bounce">🛡️</span>
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                    Rakshaa!!
                  </span>
                  <span className="animate-ping text-purple-300 text-2xl">
                    💖
                  </span>
                </h1>
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
                  Select Your Role
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {roles.map((r) => (
                    <Button
                      key={r}
                      variant="outline"
                      className="rounded-full border-purple-400 text-purple-700 hover:bg-purple-100"
                      onClick={() => setRole(r)}
                    >
                      {r}
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-center text-blue-800 mb-2">
                  {mode === "login" ? "Welcome Back!!" : `${role} Signup`}
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-sm text-gray-500">Role:</span>
                  <select
                    className="text-sm border border-purple-300 rounded-full px-4 py-1 text-purple-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {mode === "login" ? (
                  <div className="space-y-4">
                    <IconInput
                      icon={MailIcon}
                      placeholder="Your Email"
                      value={currentData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    <IconInput
                      icon={LockIcon}
                      placeholder="Your Password"
                      type="password"
                      value={currentData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-500" />
                        Remember me
                      </label>
                      <a href="#" className="text-blue-600 hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-6"
                      onClick={handleLogin}
                    >
                      LOGIN
                    </Button>
                    <p className="text-center text-sm mt-4">
                      Don’t have an account?{" "}
                      <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => {
                          setMode("signup");
                          setStep(0);
                        }}
                      >
                        Signup
                      </span>
                    </p>
                  </div>
                ) : (
                  <>
                    <Progress
                      value={(step / (steps.length - 1)) * 100}
                      className="mb-4"
                    />
                    <div className="space-y-4">
                      {steps[step] && steps[step].type === "image" ? (
                        <div className="space-y-2">
                          <div className="flex flex-col items-center space-y-4">
                            <label
                              htmlFor="profile-upload"
                              className="relative w-32 h-32 rounded-full border-2 border-dashed border-purple-400 flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-all"
                            >
                              {currentData.profilePic ? (
                                <img
                                  src={URL.createObjectURL(
                                    currentData.profilePic
                                  )}
                                  alt="Profile"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              ) : (
                                <span className="text-center text-sm text-purple-500 px-2">
                                  Click to upload
                                </span>
                              )}
                              <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageChange(e.target.files[0])
                                }
                              />
                            </label>
                            {currentData.profilePic && (
                              <p className="text-sm text-gray-600 text-center truncate max-w-xs">
                                {currentData.profilePic.name}
                              </p>
                            )}
                            <Button
                              variant="ghost"
                              onClick={() => {
                                handleImageChange(null);
                                setStep((prev) => prev + 1);
                              }}
                            >
                              Skip
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Input
                          placeholder={steps[step].label}
                          type={steps[step].type || "text"}
                          value={currentData[steps[step].field]}
                          onChange={(e) =>
                            handleChange(steps[step].field, e.target.value)
                          }
                          className="py-6 rounded-full bg-gray-100"
                        />
                      )}

                      <div className="flex justify-between">
                        <Button
                          variant="ghost"
                          disabled={step === 0}
                          onClick={() => setStep((prev) => prev - 1)}
                        >
                          Back
                        </Button>
                        {step === steps.length - 1 ? (
                          <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3"
                            onClick={handleSignup}
                          >
                            Submit
                          </Button>
                        ) : (
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3"
                            onClick={() => setStep((prev) => prev + 1)}
                          >
                            Next
                          </Button>
                        )}
                      </div>
                      <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <span
                          className="text-blue-600 cursor-pointer hover:underline"
                          onClick={() => setMode("login")}
                        >
                          Login
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
