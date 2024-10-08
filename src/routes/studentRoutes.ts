import express from "express";
import StudentController from "../controllers/studentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const studentController = new StudentController();
const studentRoutes = express.Router();

studentRoutes.post("/create", studentController.create);
studentRoutes.post("/login", studentController.login);
studentRoutes.post("/forgotPassword", studentController.forgotPassword);

studentRoutes.use(authMiddleware);

studentRoutes.get("/getOneUser/:id", studentController.getOneStudent);
studentRoutes.delete("/deleteUser/:id", studentController.deleteStudent);
studentRoutes.post(
  "/updateInfoProfile/:id",
  upload.single("file"),
  uploadFileMiddleware,
  studentController.updateInfoProfile
);

export { studentRoutes };
