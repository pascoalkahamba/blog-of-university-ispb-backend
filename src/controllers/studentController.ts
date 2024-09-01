import { Response, Request } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import StudentValidator from "../validators/studentValidator";
import { handleError } from "../errors/handleError";
import { createStudentSchema, loginStudentSchema } from "../schemas";
import StudentService from "../services/studentService";
import { StudentError } from "../errors/studantErros";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const studentValidator = new StudentValidator();
const studentService = new StudentService();

export default class StudentContoller {
  async create(req: Request, res: Response) {
    try {
      const { contact, email, password, username, registrationNumber } =
        createStudentSchema.parse(req.body);

      const student = await studentService.create({
        contact,
        email,
        password,
        username,
        registrationNumber,
      });

      if (student === "registrationAlreadyExist") {
        throw StudentError.registrationNumberAlreadyExist();
      }

      if (!student) {
        throw StudentError.emailAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(student);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        studentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getOneStudent(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const student = await studentService.getOneStudent(+id);

      if (!student) throw StudentError.studentNotFound();

      return res.status(StatusCodes.OK).json(student);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        studentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginStudentSchema.parse(req.body);

      const logged = await studentService.login({ email, password });

      if (!logged) {
        throw StudentError.emailOrPasswordWrong();
      }

      const token = jwt.sign(
        { id: logged.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: "8h" }
      );

      return res.status(StatusCodes.OK).json({
        admin: logged,
        token,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        studentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, password: newPassword } = loginStudentSchema.parse(
        req.body
      );
      const newStudentInfo = await studentService.forgotPassword(
        email,
        newPassword
      );

      if (!newStudentInfo) {
        throw StudentError.emailNotFound();
      }

      return res.status(StatusCodes.CREATED).json(newStudentInfo);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        studentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
