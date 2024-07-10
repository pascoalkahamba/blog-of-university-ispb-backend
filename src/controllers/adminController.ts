import { Response, Request } from "express";
import AdminService from "../services/adminService";
import AdminValidator from "../validators/adminValidator";
import { StatusCodes } from "http-status-codes";
import { z as zod } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { createAdminSchema } from "../schemas";

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
        console.log("email already exist.");
        const errorZod = new zod.ZodError([
          {
            code: "invalid_type",
            message: "Invalid email",
            path: ["emailAlreadyExist"],
            validation: "emailAlreadyExist",
          },
        ]);

        throw errorZod;
      }
      return res.status(StatusCodes.CREATED).json(adminCreated);
    } catch (error) {
      const validationError = fromError(error);
      const { details } = validationError;
      const pathError = details[0].path[0] as TPathError;

      adminValidator.validator(pathError, res);
    }
  }
}
