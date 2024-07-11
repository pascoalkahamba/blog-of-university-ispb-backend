import { Response, Request } from "express";
import AdminService from "../services/adminService";
import AdminValidator from "../validators/adminValidator";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { createAdminSchema } from "../schemas";
import AdminError from "../errors/adminError";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";

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
}
