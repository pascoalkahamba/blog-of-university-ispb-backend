import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import VeficationCodeStudentController from "../controllers/veficationCodeStudentController";

const validateEmailController = new VeficationCodeStudentController();
const verificationCodeStudentRoutes = express.Router();

verificationCodeStudentRoutes.get(
  "/getAllCodeStudent",
  validateEmailController.getAllCodeStudent
);
verificationCodeStudentRoutes.use(authMiddleware);
verificationCodeStudentRoutes.post(
  "/addCodeStudent",
  validateEmailController.addCodeStudent
);

verificationCodeStudentRoutes.get(
  "/getCodeStudent/:id",
  validateEmailController.getCodeStudent
);
verificationCodeStudentRoutes.post(
  "/updateCodeStudent/:id",
  validateEmailController.updateCodeStudent
);

verificationCodeStudentRoutes.delete(
  "/deleteCodeStudent/:id",
  validateEmailController.deleteCodeStudent
);

export { verificationCodeStudentRoutes };
