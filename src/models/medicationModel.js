// models/Medication.js

import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming User model for patients
    required: true,
  },
  date: {
    type: String, // format: YYYY-MM-DD
    required: true,
  },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
    },
  ],
});

const Medication =
  mongoose.models.Medication || mongoose.model("Medication", medicationSchema);

export default Medication;
