import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/adminRoutes";
import { coordinatorRoutes } from "./routes/coordinatorRoutes";
import { studentRoutes } from "./routes/studentRoutes";
import { postRoutes } from "./routes/postRoutes";
import { commentRoutes } from "./routes/commentRoutes";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/admin", adminRoutes);
app.use("/coordinator", coordinatorRoutes);
app.use("/student", studentRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("server is running!");
});
