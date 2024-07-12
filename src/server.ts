import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/adminRoutes";
import { coordinatorRoutes } from "./routes/coordinatorRoutes ";
import { studentRoutes } from "./routes/studentRoutes";

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/admin", adminRoutes);
app.use("/coordinator", coordinatorRoutes);
app.use("/student", studentRoutes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("server is running!");
});
