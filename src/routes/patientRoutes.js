import { registerPatient,
    loginPatient,
    authenticateToken,
    getPatientDetails,
    updatePatientProfile,
    getPatientById, } from "@/controllers/patientController";
import express from "express";
import multer from "multer";


const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/user/signup", upload.single("profilePic"), registerPatient);
router.post("/user/login", loginPatient);
router.get("/user/me", authenticateToken, getPatientDetails);
router.put("/user/update", authenticateToken, upload.single("profilePic"), updatePatientProfile);
router.get("/user/:patientId", getPatientById);


export default router;
