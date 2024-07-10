import express from "express";
import AdminController from "../controllers/adminController";

const adminController = new AdminController();
const adminRoutes = express.Router();

adminRoutes.post("/create", adminController.create);

export { adminRoutes };
