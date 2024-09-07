import { Response, Request } from "express";
import AdminService from "../services/adminService";
import AdminValidator from "../validators/adminValidator";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TAdminInfoUpdate, TPathError } from "../@types";
import {
  adminUpdateProfileSchema,
  createAdminSchema,
  deleteCoordinatorSchema,
  deleteStudentSchema,
  loginAdminSchema,
} from "../schemas";
import AdminError from "../errors/adminError";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import jwt from "jsonwebtoken";
import { CoordinatorError } from "../errors/coordinatorError";
import CoordinatorValidator from "../validators/coordinatorValidator";
import StudentValidator from "../validators/studentValidator";
import { StudentError } from "../errors/studantErros";

const adminService = new AdminService();
const adminValidator = new AdminValidator();
const coordinatorValidator = new CoordinatorValidator();
const studentValidator = new StudentValidator();

export default class AdminController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, username, contact } = createAdminSchema.parse(
        req.body
      );

      const adminCreated = await adminService.create({
        email,
        password,
        username,
        contact,
      });

      if (!adminCreated) {
        throw AdminError.emailAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(adminCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        adminValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginAdminSchema.parse(req.body);

      const logged = await adminService.login({ email, password });

      if (!logged) {
        throw AdminError.emailOrPasswordWrong();
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
        adminValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, password: newPassword } = loginAdminSchema.parse(req.body);
      const newAdminInfo = await adminService.forgotPassword(
        email,
        newPassword
      );

      if (!newAdminInfo) {
        throw AdminError.emailNotFound();
      }

      return res.status(StatusCodes.CREATED).json(newAdminInfo);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        adminValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const deletedAdmin = await adminService.deleteAdmin(+id);
      if (!deletedAdmin) throw AdminError.adminNotFound();

      return res.status(StatusCodes.ACCEPTED).json(deletedAdmin);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        adminValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async getOneAdmin(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const admin = await adminService.getOneAdmin(+id);

      if (!admin) throw AdminError.adminNotFound();

      return res.status(StatusCodes.OK).json(admin);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        adminValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateInfo(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as TAdminInfoUpdate;
      const { email, password, username, contact, bio } =
        adminUpdateProfileSchema.parse(parseBody);

      const adminUpdated = await adminService.updateInfo(
        {
          email,
          password,
          username,
          contact,
          bio,
          photo: {
            name: req.fileName ?? "",
            url: req.fileUrl ?? "",
          },
        },
        +id
      );

      if (!adminUpdated) {
        throw AdminError.adminNotFound();
      }

      if (!adminUpdated) {
        throw AdminError.sameInformation();
      }

      return res.status(StatusCodes.ACCEPTED).json(adminUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        adminValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteCoordinator(req: Request, res: Response) {
    try {
      const { email } = deleteCoordinatorSchema.parse(req.body);
      const coordinatorDeleted = await adminService.deleteCoordinator(email);

      if (!coordinatorDeleted) {
        throw CoordinatorError.emailNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(coordinatorDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        coordinatorValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteStudent(req: Request, res: Response) {
    try {
      const { registrationNumber } = deleteStudentSchema.parse(req.body);
      const studentDeleted = await adminService.deleteStudent(
        registrationNumber
      );

      if (!studentDeleted) {
        throw StudentError.registrationNumberNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(studentDeleted);
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
