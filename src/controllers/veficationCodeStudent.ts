import { ZodError } from "zod";
import { addCodeStudentSchema, updateCodeForStudentSchema } from "../schemas";
import { fromError } from "zod-validation-error";
import { Request, Response } from "express";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import VerificationCodeForStudent from "../validators/verificationCodeForStudent";
import { handleError } from "../errors/handleError";
import VeficationCodeStudent from "../services/veficationCodeStudent";
import { CoordinatorError } from "../errors/coordinatorError";
import { StatusCodes } from "http-status-codes";
import { VerificationCodeStudentError } from "../errors/verificationCodeStudentError";

const verificationCodeValidator = new VerificationCodeForStudent();
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

      throw VerificationCodeStudentError.codeForStudentAlreadyExists();

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

  async deleteCodeStudent(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: string };
      const deleteCodeStudent = await verificationCodeStudent.deleteCodeStudent(
        Number(id)
      );

      if (!deleteCodeStudent)
        throw VerificationCodeStudentError.codeForStudentNotFound();
      return res.status(StatusCodes.OK).json(deleteCodeStudent);
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

  async updateCodeStudent(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: string };
      const { codeForStudent } = updateCodeForStudentSchema.parse(req.body);
      const updateCodeStudent = await verificationCodeStudent.updateCodeStudent(
        Number(id),
        codeForStudent
      );

      if (!updateCodeStudent)
        throw VerificationCodeStudentError.codeForStudentNotFound();

      if (updateCodeStudent === "codeStudentAlreadyExist")
        throw VerificationCodeStudentError.codeForStudentAlreadyExists();

      return res.status(StatusCodes.ACCEPTED).json(updateCodeStudent);
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

  async getCodeStudent(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: string };
      const getCodeStudent = await verificationCodeStudent.getCodeStudent(
        Number(id)
      );

      if (!getCodeStudent)
        throw VerificationCodeStudentError.codeForStudentNotFound();

      return res.status(StatusCodes.OK).json(getCodeStudent);
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
