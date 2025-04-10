import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const labReportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pathlab",
      required: true,
    },
    reports: [reportSchema],
  },
  { timestamps: true }
);

// Avoid OverwriteModelError
const LabReport =
  mongoose.models.LabReport || mongoose.model("LabReport", labReportSchema);

export default LabReport;
