import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String },
  emergencyContact: { type: String },
  bloodType: { type: String },
  allergies: { type: String },
  medications: { type: String },
  weight: { type: String },
  height: { type: String },
  age: { type: String },
  password: { type: String, required: true },
  profilePic: { type: String },
});

const patientModel = mongoose.model("Patient", patientSchema);
export default patientModel;



