import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class CoordinatorError {
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
    return new BaseError(
      "Email do cordenador não encontrado.",
      StatusCodes.NOT_FOUND
    );
  }
  static coordinatorNotFound() {
    return new BaseError("Cordenador não encontrado.", StatusCodes.NOT_FOUND);
  }
}
