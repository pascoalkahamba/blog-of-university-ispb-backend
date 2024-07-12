import { Response, Request } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import StudentValidator from "../validators/studentValidator";
import { handleError } from "../errors/handleError";
import { createAdminSchema, loginStudentSchema } from "../schemas";
import StudentService from "../services/studentService";
import { StudentError } from "../errors/studantErros";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const studentValidator = new StudentValidator();
const studentService = new StudentService();

export default class StudentContoller {
  async create(req: Request, res: Response) {
    try {
      const { contact, email, password, username } = createAdminSchema.parse(
        req.body
      );

      const student = await studentService.create({
        contact,
        email,
        password,
        username,
      });

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
}
