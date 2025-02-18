import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class VerificationCodeStudentError {
  static invalidCode(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }
  static codeForStudentNotFound() {
    return new BaseError(
      "Numero de  matrícula não encontrado",
      StatusCodes.NOT_FOUND
    );
  }
  static codeForStudentAlreadyExists() {
    return new BaseError(
      "Numero de matrícula já cadastrado",
      StatusCodes.BAD_REQUEST
    );
  }
}
