import mongoose from "mongoose";

const mongooseUrl =
  "mongodb+srv://pascoalkahamba:pascoalkahamba@pascoalkahamba.gzqt4nr.mongodb.net/blog-university-ispb?retryWrites=true&w=majority";

const connection = mongoose.connect(mongooseUrl, {});

export { connection };
