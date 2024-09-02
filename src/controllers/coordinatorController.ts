import { Response, Request } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TCoordinatorInfoUpdate, TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import CoordinatorValidator from "../validators/coordinatorValidator";
import { handleError } from "../errors/handleError";
import {
  coordinatorUpdateProfileSchema,
  createCoordinatorSchema,
  loginCoordinatorSchema,
} from "../schemas";
import CoordinatorService from "../services/coordinatorService";
import { CoordinatorError } from "../errors/coordinatorError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ICoordinatorData } from "../interfaces";

const coordinatorValidator = new CoordinatorValidator();
const coordinatorService = new CoordinatorService();

export default class CoordinatorContoller {
  async create(req: Request, res: Response) {
    try {
      const parseBody = req.body as ICoordinatorData;
      const { contact, email, password, username, courseId, departmentId } =
        createCoordinatorSchema.parse(parseBody);

      const coordinator = await coordinatorService.create({
        courseId,
        departmentId,
        contact,
        email,
        password,
        username,
      });

      if (!coordinator) {
        throw CoordinatorError.emailAlreadyExist();
      }
      if (coordinator === "noCourse") {
        throw CoordinatorError.thisCourseNotFoundFromDepartment();
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

  async getOneCoordinator(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const coordinator = await coordinatorService.getOneCoordinator(+id);

      if (!coordinator) throw CoordinatorError.coordinatorNotFound();

      return res.status(StatusCodes.OK).json(coordinator);
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
        user: logged,
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

  async updateInfoProfile(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as TCoordinatorInfoUpdate;
      const coordinatorDataProfile =
        coordinatorUpdateProfileSchema.parse(parseBody);
      const updatedCoordinator =
        coordinatorService.updateInfoProfileCoordinator(
          +id,
          coordinatorDataProfile
        );

      if (!updatedCoordinator) throw CoordinatorError.coordinatorNotFound();

      return res.status(StatusCodes.ACCEPTED).json(updatedCoordinator);
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

  async deleteCoordinator(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };

      const deletedCoordinator = await coordinatorService.deleteCoordinator(
        +id
      );

      if (!deletedCoordinator) throw CoordinatorError.coordinatorNotFound();

      return res.status(StatusCodes.OK).json(deletedCoordinator);
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
