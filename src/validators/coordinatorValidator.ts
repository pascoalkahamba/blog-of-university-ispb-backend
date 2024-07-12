import { Response } from "express";
import { TPathError } from "../@types";
import AdminError from "../errors/adminError";
import { handleError } from "../errors/handleError";
import { CoordinatorError } from "../errors/coordinatorError";

export default class CoordinatorValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(
        AdminError.invalidInfo("Nome do codernador invalido."),
        res
      );
    }
    if (pathError === "password") {
      return handleError(
        AdminError.invalidInfo("Senha do codernador invalido."),
        res
      );
    }
    if (pathError === "emailNotFound") {
      return handleError(CoordinatorError.emailNotFound(), res);
    }
    if (pathError === "contact") {
      return handleError(
        AdminError.invalidInfo("Contacto do codernador invalido."),
        res
      );
    }

    if (pathError === "emailAlreadyExist") {
      return handleError(AdminError.invalidInfo("Email já cadastrado."), res);
    }
  }
}
