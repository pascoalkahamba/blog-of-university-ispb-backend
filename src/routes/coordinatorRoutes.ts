import express from "express";
import CoordinatorController from "../controllers/coordinatorController";
import { authMiddleware } from "../middlewares/authMiddleware";

const coordinatorController = new CoordinatorController();
const coordinatorRoutes = express.Router();

coordinatorRoutes.post("/create", coordinatorController.create);
coordinatorRoutes.post("/login", coordinatorController.login);
coordinatorRoutes.post("/forgotPassword", coordinatorController.forgotPassword);

coordinatorRoutes.use(authMiddleware);
coordinatorRoutes.get(
  "/getOneUser/:id",
  coordinatorController.getOneCoordinator
);

coordinatorRoutes.post(
  "/updateInfoProfile/:id",
  coordinatorController.updateInfoProfile
);
coordinatorRoutes.delete(
  "/deleteCoordinator/:id",
  coordinatorController.deleteCoordinator
);

export { coordinatorRoutes };
