import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { CommentError } from "../errors/commentError";

export default class CommentValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "content") {
      return handleError(
        CommentError.invalidContent("Conteudo do comentario invalido."),
        res
      );
    }
    if (pathError === "whoCreator") {
      return handleError(
        CommentError.invalidContent("Nome do criador do comentario invalido."),
        res
      );
    }
  }
}
