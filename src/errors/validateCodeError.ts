import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class ValidateCodeError {
  static invalidCode() {
    return new BaseError(
      "Código de verificação inválido ou expirado",
      StatusCodes.UNAUTHORIZED
    );
  }
  static invalidOperation() {
    return new BaseError(
      "Operação do usuário inválido",
      StatusCodes.BAD_REQUEST
    );
  }
}
