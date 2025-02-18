import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import VeficationCodeStudent from "../controllers/veficationCodeStudent";
import { verificationCodeRoutes } from "./verificationCodeRoutes";

const validateEmailController = new VeficationCodeStudent();
const verificationCodeStudentRoutes = express.Router();

verificationCodeStudentRoutes.use(authMiddleware);
verificationCodeStudentRoutes.post(
  "/addCodeStudent",
  validateEmailController.addCodeStudent
);
verificationCodeStudentRoutes.get(
  "/getAllCodeStudent",
  validateEmailController.getAllCodeStudent
);

verificationCodeRoutes.get(
  "/getCodeStudent/:id",
  validateEmailController.getCodeStudent
);
verificationCodeRoutes.post(
  "/updateCodeStudent/:id",
  validateEmailController.updateCodeStudent
);

verificationCodeRoutes.delete(
  "/deleteCodeStudent/:id",
  validateEmailController.deleteCodeStudent
);

export { verificationCodeStudentRoutes };
