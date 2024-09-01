import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { DepartmentError } from "../errors/departmentError";

export default class DepartmentValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "courses") {
      return handleError(
        DepartmentError.invalidInfo("Cursos do departamento invalido."),
        res
      );
    }
    if (pathError === "subjects") {
      return handleError(
        DepartmentError.invalidInfo("Disciplinas do departamento invalido."),
        res
      );
    }
    if (pathError === "name") {
      return handleError(
        DepartmentError.invalidInfo("Nomde do departamento invalido."),
        res
      );
    }
  }
}
