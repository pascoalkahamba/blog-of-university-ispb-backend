import express from "express";
import AdminController from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const adminController = new AdminController();
const adminRoutes = express.Router();

adminRoutes.post("/create", adminController.create);
adminRoutes.post("/login", adminController.login);
adminRoutes.post("/forgotPassword", adminController.forgotPassword);

adminRoutes.use(authMiddleware);

adminRoutes.get("/getOneUser/:id", adminController.getOneAdmin);
adminRoutes.post(
  "/updateInfoProfile/:id",
  upload.single("file"),
  uploadFileMiddleware,
  adminController.updateInfo
);
adminRoutes.delete("/deleteCoordinator", adminController.deleteCoordinator);
adminRoutes.delete("/deleteStudent", adminController.deleteStudent);

export { adminRoutes };
