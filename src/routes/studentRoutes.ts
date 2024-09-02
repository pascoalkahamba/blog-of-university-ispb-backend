import express from "express";
import StudentController from "../controllers/studentController";
import { authMiddleware } from "../middlewares/authMiddleware";

const studentController = new StudentController();
const studentRoutes = express.Router();

studentRoutes.post("/create", studentController.create);
studentRoutes.post("/login", studentController.login);
studentRoutes.post("/forgotPassword", studentController.forgotPassword);

studentRoutes.use(authMiddleware);

studentRoutes.get("/getOneUser/:id", studentController.getOneStudent);
studentRoutes.delete("/deleteStudent/:id", studentController.deleteStudent);
studentRoutes.get(
  "/updateInfoProfile/:id",
  studentController.updateInfoProfile
);

export { studentRoutes };
