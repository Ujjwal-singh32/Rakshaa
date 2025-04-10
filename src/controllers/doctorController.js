import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import Doctor from "../models/doctorModel.js";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db.js";

// Create JWT Token
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// Register Doctor
const registerDoctor = async (req, res) => {
  try {
    await connectDB();
    const {
      name,
      email,
      phone,
      specialization,
      qualification,
      experience,
      hospital,
      address,
      languages,
      consultationFees,
      achievements,
      college,
      pastHospitals,
      password,
      confirmPassword,
    } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Passwords do not match" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.json({ success: false, message: "Doctor already exists" });
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

    const newDoctor = new Doctor({
      name,
      email,
      phone,
      specialization,
      qualification,
      experience,
      hospital,
      address,
      languages,
      consultationFees,
      achievements,
      college,
      pastHospitals,
      password: hashedPassword,
      profilePic: imageUrl,
    });

    const doctor = await newDoctor.save();
    const token = createToken(doctor._id);

    res.json({
      success: true,
      token,
      message: "Doctor registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// Login Doctor
const loginDoctor = async (req, res) => {
  try {
    await connectDB();

    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const match = await bcrypt.compare(password, doctor.password);
    if (!match) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(doctor._id);
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Error" });
  }
};

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

// Get Doctor Details
const getDoctorDetails = async (req, res) => {
  try {
    await connectDB();

    const doctor = await Doctor.findById(req.user.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Doctor Profile
const updateDoctorProfile = async (req, res) => {
  try {
    await connectDB();

    const updateData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.profilePic = result.secure_url;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.json({
      success: true,
      message: "Profile updated",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Doctor by ID
const getDoctorById = async (req, res) => {
  try {
    await connectDB();

    const doctor = await Doctor.findById(req.params.doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export {
  registerDoctor,
  loginDoctor,
  authenticateToken,
  getDoctorDetails,
  updateDoctorProfile,
  getDoctorById,
};
