import express from "express";
import CoordinatorController from "../controllers/coordinatorController";
import { authMiddleware } from "../middlewares/authMiddleware";

const coordinatorController = new CoordinatorController();
const coordinatorRoutes = express.Router();

coordinatorRoutes.post("/create", coordinatorController.create);
coordinatorRoutes.post("/login", coordinatorController.login);

export { coordinatorRoutes };
