import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import patientModel from "@/models/patientModel";
import connectDB from "@/lib/db";

// JWT token creator
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ===================== REGISTER =====================
const registerPatient = async (req, res) => {
  try {
    await connectDB();

    const {
      name,
      email,
      phone,
      address,
      emergencyContact,
      bloodType,
      allergies,
      medications,
      weight,
      height,
      age,
      password,
      confirmPassword,
    } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingPatient = await patientModel.findOne({ email });

    if (existingPatient) {
      return res.json({ success: false, message: "Patient already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    const newPatient = new patientModel({
      name,
      email,
      phone,
      address,
      emergencyContact,
      bloodType,
      allergies,
      medications,
      weight,
      height,
      age,
      password: hashedPassword,
      profilePic: imageUrl,
    });

    const savedPatient = await newPatient.save();
    const token = createToken(savedPatient._id);

    res.json({ success: true, token, message: "Patient Registered Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ===================== LOGIN =====================
const loginPatient = async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    const patient = await patientModel.findOne({ email });

    if (!patient) {
      return res.json({ success: false, message: "Patient not found" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    const token = createToken(patient._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ===================== AUTH MIDDLEWARE =====================
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// ===================== GET PROFILE =====================
const getPatientDetails = async (req, res) => {
  try {
    await connectDB();
    const patient = await patientModel.findById(req.user.id);
    if (!patient) {
      return res.status(404).send({ success: false, message: "Patient not found" });
    }
    res.status(200).send({ success: true, patient });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// ===================== UPDATE PROFILE =====================
const updatePatientProfile = async (req, res) => {
  try {
    await connectDB();
    const {
      name,
      email,
      phone,
      address,
      emergencyContact,
      bloodType,
      allergies,
      medications,
      weight,
      height,
      age,
    } = req.body;

    const updatedData = {
      name,
      email,
      phone,
      address,
      emergencyContact,
      bloodType,
      allergies,
      medications,
      weight,
      height,
      age,
    };

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    if (imageUrl) {
      updatedData.profilePic = imageUrl;
    }

    const updatedPatient = await patientModel.findByIdAndUpdate(
      req.user.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

// ===================== GET PATIENT BY ID =====================
const getPatientById = async (req, res) => {
  try {
    await connectDB();

    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).send({ success: false, message: "Patient ID is required" });
    }

    const patient = await patientModel.findById(patientId);

    if (!patient) {
      return res.status(404).send({ success: false, message: "Patient not found" });
    }

    res.status(200).send({ success: true, patient });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server error", error });
  }
};

export {
  registerPatient,
  loginPatient,
  authenticateToken,
  getPatientDetails,
  updatePatientProfile,
  getPatientById,
};
