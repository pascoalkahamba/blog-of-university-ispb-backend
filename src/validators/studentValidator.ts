import { Response } from "express";
import { TPathError } from "../@types";
import AdminError from "../errors/adminError";
import { handleError } from "../errors/handleError";
import { StudentError } from "../errors/studantErros";

export default class StudentValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(
        AdminError.invalidInfo("Nome do estudante invalido."),
        res
      );
    }
    if (pathError === "password") {
      return handleError(
        AdminError.invalidInfo("Senha do estudante invalido."),
        res
      );
    }
    if (pathError === "emailNotFound") {
      return handleError(StudentError.emailNotFound(), res);
    }
    if (pathError === "contact") {
      return handleError(
        AdminError.invalidInfo("Contacto do estudante invalido."),
        res
      );
    }

    if (pathError === "emailAlreadyExist") {
      return handleError(AdminError.invalidInfo("Email já cadastrado."), res);
    }
    if (pathError === "registrationNumber") {
      return handleError(StudentError.registrationNumberNotFound(), res);
    }
  }
}
