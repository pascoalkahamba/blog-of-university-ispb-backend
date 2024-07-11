import express from "express";
import AdminController from "../controllers/adminController";

const adminController = new AdminController();
const adminRoutes = express.Router();

adminRoutes.post("/create", adminController.create);
adminRoutes.post("/login", adminController.login);
adminRoutes.post("/forgotPassword", adminController.forgotPassword);

export { adminRoutes };
