import { BaseError } from "../errors/baseError";
import { handleError } from "../errors/handleError";
import { Response, Request } from "express";
import AdminService from "../services/adminService";
import AdminValidator from "../validators/adminValidator";
import AdminError from "../errors/adminError";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { fromError } from "zod-validation-error";
import { AdminInfoLoginT, PathErrorT } from "../@types";

const adminService = new AdminService();
const adminValidator = new AdminValidator();

const createAdminSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
  email: z.string().email(),
});

export default class AdminController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, username } = createAdminSchema.parse(req.body);

      const adminCreated = await adminService.create({
        email,
        password,
        username,
      });

      if (!adminCreated) {
        throw AdminError.emailAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(adminCreated);
    } catch (error) {
      const validationError = fromError(error);
      const { details } = validationError;
      const pathError = details[0].path[0] as PathErrorT;

      if (!pathError) {
        return handleError(error as BaseError, res);
      }
      adminValidator.validator(pathError, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as AdminInfoLoginT;
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async allAdmins(req: Request, res: Response) {
    try {
      const allAdmins = await adminService.allAdmins();

      return res.status(StatusCodes.OK).json(allAdmins);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
