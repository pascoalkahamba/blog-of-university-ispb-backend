import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class StudantErrors {
  static invalidContent(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }
  static postNotFound() {
    return new BaseError("Post não encontrado.", StatusCodes.NOT_FOUND);
  }
  // static invalidTitle() {
  //   return new BaseError("Titulo invalido", StatusCodes.BAD_REQUEST);
  // }
  // static invalidUniversity() {
  //   return new BaseError(
  //     "Nome da universidade invalida",
  //     StatusCodes.BAD_REQUEST
  //   );
  // }
}
