import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import Doctor from "@/models/doctorModel";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  try {
    await connectDB();
    const formData = await req.formData();

    const id = formData.get("id"); // pass this from frontend
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing doctor ID" });
    }

    const updatedFields = {};
    formData.forEach((value, key) => {
      if (key !== "profilePic" && key !== "id") {
        updatedFields[key] = value;
      }
    });

    const file = formData.get("profilePic");
    if (file && file.arrayBuffer) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, { folder: "rakshaa/doctors" });
      updatedFields.profilePic = result.secure_url;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedFields, { new: true });
    return NextResponse.json({ success: true, doctor: updatedDoctor });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
