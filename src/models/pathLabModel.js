// models/PathLab.js

import mongoose from "mongoose";

const pathLabSchema = new mongoose.Schema(
  {
    labName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    labAddress: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default: "", 
    },
  },
  { timestamps: true }
);

export default mongoose.models.PathLab || mongoose.model("PathLab", pathLabSchema);
