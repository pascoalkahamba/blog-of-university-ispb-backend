import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class ReplyError {
  static invalidContent(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }
  static replyNotFound() {
    return new BaseError("Resposta não encontrado.", StatusCodes.BAD_REQUEST);
  }
}
