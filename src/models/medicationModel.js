import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const medicationRecordSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medications: [medicationSchema],
  },
  { timestamps: true }
);

// Avoid OverwriteModelError
const MedicationRecord =
  mongoose.models.MedicationRecord ||
  mongoose.model("MedicationRecord", medicationRecordSchema);

export default MedicationRecord;
