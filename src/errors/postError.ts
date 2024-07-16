import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class PostError {
  static titleOfPostAlreadyExist() {
    return new BaseError("Titulo do texto já criado.", StatusCodes.CONFLICT);
  }

  static invalidInfo(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }
}
