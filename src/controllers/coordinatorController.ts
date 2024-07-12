import { Response, Request } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import CoordinatorValidator from "../validators/coordinatorValidator";
import { handleError } from "../errors/handleError";
import { createCoordinatorSchema, loginCoordinatorSchema } from "../schemas";
import CoordinatorService from "../services/coordinatorService";
import { CoordinatorError } from "../errors/coordinatorError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

const coordinatorValidator = new CoordinatorValidator();
const coordinatorService = new CoordinatorService();

export default class CoordinatorContoller {
  async create(req: Request, res: Response) {
    try {
      const { contact, email, password, username, department } =
        createCoordinatorSchema.parse(req.body);

      const coordinator = await coordinatorService.create(
        {
          contact,
          email,
          password,
          username,
        },
        department
      );

      if (!coordinator) {
        throw CoordinatorError.emailAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(coordinator);
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

  async login(req: Request, res: Response) {
    try {
      const { email, password } = loginCoordinatorSchema.parse(req.body);

      const logged = await coordinatorService.login({ email, password });

      if (!logged) {
        throw CoordinatorError.emailOrPasswordWrong();
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
        coordinatorValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email, password: newPassword } = loginCoordinatorSchema.parse(
        req.body
      );
      const newCoordinatorInfo = await coordinatorService.forgotPassword(
        email,
        newPassword
      );

      if (!newCoordinatorInfo) {
        throw CoordinatorError.emailNotFound();
      }

      return res.status(StatusCodes.CREATED).json(newCoordinatorInfo);
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
}
