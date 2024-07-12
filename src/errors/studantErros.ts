import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class StudentError {
  static invalidInfo(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }

  static emailAlreadyExist() {
    return new BaseError(
      "Email ou contacto já cadastrado.",
      StatusCodes.CONFLICT
    );
  }

  static registrationNumberAlreadyExist() {
    return new BaseError(
      "Número de matriculo do estudante já cadastrado.",
      StatusCodes.CONFLICT
    );
  }

  static emailOrPasswordWrong() {
    return new BaseError("Email ou senha errada.", StatusCodes.BAD_REQUEST);
  }

  static emailNotFound() {
    return new BaseError(
      "Email do estudante não encontrado.",
      StatusCodes.NOT_FOUND
    );
  }
  static registrationNumberNotFound() {
    return new BaseError(
      "Número de matriculo do estudante invalido.",
      StatusCodes.NOT_FOUND
    );
  }
}
