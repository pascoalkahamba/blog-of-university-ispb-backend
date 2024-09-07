import express from "express";
import CoordinatorController from "../controllers/coordinatorController";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

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
  upload.single("file"),
  uploadFileMiddleware,
  coordinatorController.updateInfoProfile
);
coordinatorRoutes.delete(
  "/deleteUser/:id",
  coordinatorController.deleteCoordinator
);

export { coordinatorRoutes };
