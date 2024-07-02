import mongoose from "mongoose";

const postDataSchema = new mongoose.Schema({
  title: String,
  university: String,
  favorite: Boolean,
  content: String,
  image: String,
  date: String,
  idChanged: Boolean,
  // image: Buffer,
  // date: Date,
  views: Number,
});

// const userAdmin = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
// });

const modalPostDataSchema = mongoose.model(
  "blog-university-ispb",
  postDataSchema
);

// const modalUserAdminSchema = mongoose.model("adminInfomation", userAdmin);

export { modalPostDataSchema };
