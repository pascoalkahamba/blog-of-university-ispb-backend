import express from "express";
import AdminController from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";

const adminController = new AdminController();
const adminRoutes = express.Router();

adminRoutes.post("/create", adminController.create);
adminRoutes.post("/login", adminController.login);
adminRoutes.post("/forgotPassword", adminController.forgotPassword);

adminRoutes.use(authMiddleware);

adminRoutes.get("/getOneUser/:id", adminController.getOneAdmin);
adminRoutes.post("/updateInfo/:id", adminController.updateInfo);
adminRoutes.delete("/deleteCoordinator", adminController.deleteCoordinator);
adminRoutes.delete("/deleteStudent", adminController.deleteStudent);

export { adminRoutes };
