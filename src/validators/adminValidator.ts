import { Response } from "express";
import { PathErrorT } from "../@types";
import AdminError from "../errors/adminError";
import { BaseError } from "../errors/baseError";
import { handleError } from "../errors/handleError";

export default class AdminValidator {
  validator(pathError: PathErrorT, res: Response) {
    if (pathError === "username") {
      return handleError(
        AdminError.invalidInfo("Nome do admin está invalido.") as BaseError,
        res
      );
    }
    if (pathError === "password") {
      return handleError(
        AdminError.invalidInfo("Senha do admin está invalido.") as BaseError,
        res
      );
    }
    if (pathError === "email") {
      return handleError(
        AdminError.invalidInfo("Email do admin está invalido.") as BaseError,
        res
      );
    }
  }
}
