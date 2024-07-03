import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class AdminError {
  static invalidInfo(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }

  static emailAlreadyExist() {
    return new BaseError("Email já cadastrado.", StatusCodes.CONFLICT);
  }
}
