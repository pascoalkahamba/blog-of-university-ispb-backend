import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class AuthError {
  static typeOfAuthInvalid() {
    return new BaseError(
      "Tipo de autenticação não permitido",
      StatusCodes.UNAUTHORIZED
    );
  }

  static tokenNotFound() {
    return new BaseError("Token não fornecido", StatusCodes.UNAUTHORIZED);
  }

  static tokenNotAccept() {
    return new BaseError("Token não autorizado", StatusCodes.UNAUTHORIZED);
  }
}
