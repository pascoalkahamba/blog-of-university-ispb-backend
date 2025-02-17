import { ZodError } from "zod";
import { addCodeStudentSchema } from "../schemas";
import { fromError } from "zod-validation-error";
import { Request, Response } from "express";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import VerificationCodeValidator from "../validators/verificationCodeValidator";
import { handleError } from "../errors/handleError";
import VeficationCodeStudent from "../services/veficationCodeStudent";
import { CoordinatorError } from "../errors/coordinatorError";
import { StatusCodes } from "http-status-codes";

const verificationCodeValidator = new VerificationCodeValidator();
const verificationCodeStudent = new VeficationCodeStudent();

export default class VeficationCodeStudentController {
  async addCodeStudent(req: Request, res: Response) {
    try {
      const { code, email } = addCodeStudentSchema.parse(req.body);
      const newCode = await verificationCodeStudent.addCodeStudent({
        code,
        email,
      });

      if (!newCode) throw CoordinatorError.coordinatorNotFound();
      if (newCode === "userCannotAddCode")
        throw CoordinatorError.coordinatorCannotAddCode();

      return res.status(StatusCodes.CREATED).json(newCode);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        verificationCodeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllCodeStudent(req: Request, res: Response) {
    try {
      const allCodeStudent = await verificationCodeStudent.getAllCodeStudent();
      return res.status(StatusCodes.OK).json(allCodeStudent);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        verificationCodeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
