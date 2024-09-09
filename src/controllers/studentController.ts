import { Response, Request } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import StudentValidator from "../validators/studentValidator";
import { handleError } from "../errors/handleError";
import {
  createStudentSchema,
  loginStudentSchema,
  studentUpdateProfileSchema,
} from "../schemas";
import StudentService from "../services/studentService";
import { StudentError } from "../errors/studantErros";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IStudentData } from "../interfaces";

const studentValidator = new StudentValidator();
const studentService = new StudentService();

export default class StudentContoller {
  async create(req: Request, res: Response) {
    try {
      const parseBody = req.body as IStudentData;
      console.log("body", parseBody);
      const studentData = createStudentSchema.parse({
        contact: String(parseBody.contact),
        registrationNumber: String(parseBody.registrationNumber),
        email: parseBody.email,
        password: parseBody.password,
        username: parseBody.username,
        isStudent: parseBody.isStudent,
        courseId: parseBody.courseId,
      });

      const student = await studentService.create({ ...studentData });

      if (student === "registrationAlreadyExist") {
        throw StudentError.registrationNumberAlreadyExist();
      }

      if (!student) {
        throw StudentError.emailAlreadyExist();
      }
      if (student === "noCourse") {
        throw StudentError.courseNotFound();
      }

      return res.status(StatusCodes.CREATED).json(student);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log("zod error", error);
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        studentValidator.validator(pathError, res);
      } else {
        console.log("error", error);
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
        user: logged,
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

  async updateInfoProfile(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const bodyData = studentUpdateProfileSchema.parse(req.body);

      const updatedStudent = await studentService.updateInfoStudent(+id, {
        ...bodyData,
        photo: {
          name: req.fileName ?? "",
          url: req.fileUrl ?? "",
        },
      });

      if (!updatedStudent) throw StudentError.studentNotFound();

      return res.status(StatusCodes.ACCEPTED).json(updatedStudent);
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

  async deleteStudent(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const deletedStudent = await studentService.deleteStudent(+id);

      if (!deletedStudent) throw StudentError.studentNotFound();

      return res.status(StatusCodes.ACCEPTED).json(deletedStudent);
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
