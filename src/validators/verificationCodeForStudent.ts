import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { VerificationCodeStudentError } from "../errors/verificationCodeStudentError";

export default class VerificationCodeForStudent {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "codeForStudent") {
      return handleError(
        VerificationCodeStudentError.invalidCode(
          "Matricula do estudante invalido"
        ),
        res
      );
    }
  }
}
