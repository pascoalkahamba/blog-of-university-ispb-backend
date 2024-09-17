import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import ValidateEmailController from "../controllers/validateEmailController";

const validateEmailController = new ValidateEmailController();
const verificationCodeRoutes = express.Router();

verificationCodeRoutes.post(
  "/requestVerificationCode",
  validateEmailController.requestVerificationCode
);
verificationCodeRoutes.post(
  "/verifyCodeAndProceed",
  validateEmailController.verifyCodeAndProceed
);

verificationCodeRoutes.use(authMiddleware);

export { verificationCodeRoutes };
