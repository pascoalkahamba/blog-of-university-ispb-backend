import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { ValidateCodeError } from "../errors/validateCodeError";

export default class VerificationCodeValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "code") {
      return handleError(ValidateCodeError.invalidCode(), res);
    }
    if (pathError === "operation") {
      return handleError(ValidateCodeError.invalidOperation(), res);
    }
  }
}
