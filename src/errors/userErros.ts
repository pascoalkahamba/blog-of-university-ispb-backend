import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class UserErrors {
  static invalidContent() {
    return new BaseError("Conteudo invalido", StatusCodes.BAD_REQUEST);
  }
}
