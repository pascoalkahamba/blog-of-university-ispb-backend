import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { PostError } from "../errors/postError";

export default class AdminValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(PostError.invalidInfo("Nome do admin invalido."), res);
    }
    if (pathError === "password") {
      return handleError(
        PostError.invalidInfo("Senha do admin invalido."),
        res
      );
    }
    if (pathError === "email") {
      return handleError(
        PostError.invalidInfo("Email do admin invalido."),
        res
      );
    }
    if (pathError === "contact") {
      return handleError(
        PostError.invalidInfo("Contacto do admin invalido."),
        res
      );
    }

    if (pathError === "emailAlreadyExist") {
      return handleError(PostError.invalidInfo("Email já cadastrado."), res);
    }
  }
}
