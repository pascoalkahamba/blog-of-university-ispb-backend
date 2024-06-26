import mongoose from "mongoose";

const universityDataSchema = new mongoose.Schema({
  title: String,
  university: String,
  favorite: Boolean,
  content: String,
  date: Date,
});

const modalUniversityDataSchema = mongoose.model(
  "blog-university-ispb",
  universityDataSchema
);

export { modalUniversityDataSchema };
