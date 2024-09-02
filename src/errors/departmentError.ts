import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class DepartmentError {
  static invalidInfo(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }

  static departmentAlreadyExist() {
    return new BaseError(
      "Departmento, curso ou disciplina já cadastrado.",
      StatusCodes.CONFLICT
    );
  }

  static departmentNotFound() {
    return new BaseError("Departmento não encontrado.", StatusCodes.NOT_FOUND);
  }

  static subjectNotFound() {
    return new BaseError(
      "Disciplina(s) não encontrado.",
      StatusCodes.NOT_FOUND
    );
  }
  static courseNotFound() {
    return new BaseError("Courso não encontrado.", StatusCodes.NOT_FOUND);
  }
  static departmentItemsNotFound() {
    return new BaseError(
      "Departamento, curso ou disciplina não encontradas.",
      StatusCodes.NOT_FOUND
    );
  }
}
