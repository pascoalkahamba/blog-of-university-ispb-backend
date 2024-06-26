import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes";

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server is running!");
});
