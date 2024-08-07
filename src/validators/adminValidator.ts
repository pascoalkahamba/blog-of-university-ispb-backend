import { Response } from "express";
import { TPathError } from "../@types";
import AdminError from "../errors/adminError";
import { handleError } from "../errors/handleError";

export default class AdminValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(
        AdminError.invalidInfo("Nome do admin invalido."),
        res
      );
    }
    if (pathError === "password") {
      return handleError(
        AdminError.invalidInfo("Senha do admin invalido."),
        res
      );
    }
    if (pathError === "email") {
      return handleError(
        AdminError.invalidInfo("Email do admin invalido."),
        res
      );
    }
    if (pathError === "contact") {
      return handleError(
        AdminError.invalidInfo("Contacto do admin invalido."),
        res
      );
    }

    if (pathError === "emailAlreadyExist") {
      return handleError(AdminError.invalidInfo("Email já cadastrado."), res);
    }
  }
}
