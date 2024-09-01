import { Response, Request } from "express";
import { DepartmentService } from "../services/departmentService";
import {
  IDepartmentData,
  IRemoveCourseFromDepartment,
  IRemoveSubjectFromCourse,
} from "../interfaces";
import { createDepartmentSchema } from "../schemas";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import { handleError } from "../errors/handleError";
import { StatusCodes } from "http-status-codes";
import DepartmentValidator from "../validators/departmentValidator";
import { DepartmentError } from "../errors/departmentError";

const departmentService = new DepartmentService();
const departmentValidator = new DepartmentValidator();

export class DepartmentController {
  async create(req: Request, res: Response) {
    try {
      const parseBody = req.body as IDepartmentData;
      const { courses, name } = createDepartmentSchema.parse(parseBody);

      const createdDepartment = await departmentService.create({
        courses,
        name,
      });

      if (!createdDepartment) throw DepartmentError.departmentAlreadyExist();

      return res.status(StatusCodes.CREATED).json(createdDepartment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        departmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as IDepartmentData;
      const { courses, name } = createDepartmentSchema.parse(parseBody);
      const updatedDepartment = await departmentService.update({
        id: +id,
        courses,
        name,
      });

      if (!updatedDepartment) throw DepartmentError.departmentNotFound();

      return res.status(StatusCodes.ACCEPTED).json(updatedDepartment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        departmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.body as unknown as { id: number };
      const deletedDepartment = await departmentService.delete(+id);
      if (!deletedDepartment) throw DepartmentError.departmentNotFound();

      return res.status(StatusCodes.ACCEPTED).json(deletedDepartment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        departmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteSubjectFromCourse(req: Request, res: Response) {
    try {
      const { courseId, departmentId, subjectId } =
        req.params as unknown as IRemoveSubjectFromCourse;
      const deletedSubject = await departmentService.removeSubjectFromCourse({
        courseId: +courseId,
        departmentId: +departmentId,
        subjectId: +subjectId,
      });

      if (!deletedSubject) throw DepartmentError.departmentItemsNotFound();

      return res.status(StatusCodes.ACCEPTED).json(deletedSubject);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        departmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteCourseFromDepartment(req: Request, res: Response) {
    try {
      const { courseId, departmentId } =
        req.params as unknown as IRemoveCourseFromDepartment;

      const deletedCourse = await departmentService.removeCourseFromDepartment({
        courseId: +courseId,
        departmentId: +departmentId,
      });

      if (!deletedCourse) throw DepartmentError.departmentItemsNotFound();

      return res.status(StatusCodes.ACCEPTED).json(deletedCourse);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        departmentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
