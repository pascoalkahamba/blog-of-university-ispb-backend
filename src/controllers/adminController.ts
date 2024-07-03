import { BaseError } from "../errors/baseError";
import { handleError } from "../errors/handleError";
import { AdminInfoI } from "../interfaces";
import { Response, Request } from "express";
import AdminService from "../service/adminService";
import AdminValidator from "../validators/adminValidator";
import AdminError from "../errors/adminError";
import { StatusCodes } from "http-status-codes";

const adminService = new AdminService();
const adminValidator = new AdminValidator();

export default class AdminController {
  async create(req: Request, res: Response) {
    try {
      const { email, password, username } = req.body as AdminInfoI;
      adminValidator.validator({ email, password, username });

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
