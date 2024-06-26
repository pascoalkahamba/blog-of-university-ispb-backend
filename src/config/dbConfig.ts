import mongoose from "mongoose";

const connection = mongoose.connect(process.env.MONGODBCONNECTION!, {});

export { connection };
