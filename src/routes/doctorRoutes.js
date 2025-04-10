import {  registerDoctor,
    loginDoctor,
    authenticateToken,
    getDoctorDetails,
    updateDoctorProfile,
    getDoctorById, } from "@/controllers/doctorController";
import express from "express";
import multer from "multer";


const router = express.Router();

// Multer setup
const upload = multer({ dest: "uploads/" });

router.post("/doctor/signup", upload.single("profilePic"), registerDoctor);
router.post("/doctor/login", loginDoctor);
router.get("/doctor/me", authenticateToken, getDoctorDetails);
router.put("/doctor/update", authenticateToken, upload.single("profilePic"), updateDoctorProfile);
router.get("/doctor/:doctorId", getDoctorById);

export default router;
