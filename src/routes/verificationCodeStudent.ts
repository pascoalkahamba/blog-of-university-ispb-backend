import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import VeficationCodeStudent from "../controllers/veficationCodeStudent";

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

export { verificationCodeStudentRoutes };
