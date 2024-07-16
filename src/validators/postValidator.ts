import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { PostError } from "../errors/postError";

export default class PostValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "content") {
      return handleError(
        PostError.invalidInfo("Conteudo do post invalido."),
        res
      );
    }
    if (pathError === "title") {
      return handleError(
        PostError.invalidInfo("titulo do post invalido."),
        res
      );
    }
    if (pathError === "kindOfFile") {
      return handleError(
        PostError.invalidInfo("Tipo de arquivo invalido."),
        res
      );
    }
    if (pathError === "createrPostId") {
      return handleError(PostError.invalidInfo("id do criador invalido."), res);
    }

    if (pathError === "width") {
      return handleError(
        PostError.invalidInfo("Tamanho do ficheiro invalido."),
        res
      );
    }
    if (pathError === "height") {
      return handleError(
        PostError.invalidInfo("Altura do ficheiro invalido."),
        res
      );
    }
    if (pathError === "mimeType") {
      return handleError(
        PostError.invalidInfo("Tipo do mimeType do ficheiro invalido."),
        res
      );
    }
    if (pathError === "size") {
      return handleError(
        PostError.invalidInfo("Tamanho do ficheiro invalido."),
        res
      );
    }

    if (pathError === "nameOfDepartment") {
      return handleError(
        PostError.invalidInfo("Nome do departamento invalido."),
        res
      );
    }
    if (pathError === "whoPosted") {
      return handleError(
        PostError.invalidInfo("Nome do criador do post invalido."),
        res
      );
    }
    if (pathError === "name") {
      return handleError(
        PostError.invalidInfo("Nome do ficheiro invalido."),
        res
      );
    }
    if (pathError === "id") {
      return handleError(PostError.invalidInfo("Post não encontrado."), res);
    }
  }
}
