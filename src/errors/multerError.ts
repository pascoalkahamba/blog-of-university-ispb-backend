import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class MulterErrors {
  static multerErrorFile() {
    return new BaseError("Tipo de arquivo invalido", StatusCodes.BAD_REQUEST);
  }
}
