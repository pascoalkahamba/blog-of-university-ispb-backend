import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class CommentError {
  static invalidContent(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }
  static commentNotFound() {
    return new BaseError("Comentário não encontrado.", StatusCodes.BAD_REQUEST);
  }
}
