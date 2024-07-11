import { Response, Request } from "express";
import AdminService from "../services/adminService";
import AdminValidator from "../validators/adminValidator";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { createAdminSchema, loginAdminSchema } from "../schemas";
import AdminError from "../errors/adminError";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import jwt from "jsonwebtoken";
const adminService = new AdminService();
const adminValidator = new AdminValidator();

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
        admin: logged,
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
}
