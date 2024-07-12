import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class AdminError {
  static invalidInfo(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }

  static emailAlreadyExist() {
    return new BaseError(
      "Email ou contacto já cadastrado.",
      StatusCodes.CONFLICT
    );
  }

  static emailOrPasswordWrong() {
    return new BaseError("Email ou senha errada.", StatusCodes.BAD_REQUEST);
  }

  static emailNotFound() {
    return new BaseError("Email não foi encontrado.", StatusCodes.NOT_FOUND);
  }
  static adminNotFound() {
    return new BaseError("Admin não foi encontrado.", StatusCodes.NOT_FOUND);
  }
  static sameInformation() {
    return new BaseError(
      "Email vou contacto são semelhantes.",
      StatusCodes.CONFLICT
    );
  }
}
