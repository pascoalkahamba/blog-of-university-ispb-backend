import { PostDataT } from "../@types";
import UserErrors from "../errors/userErros";

export class UserValidator {
  validate(postData: PostDataT) {
    if (postData.content.length <= 4) {
      throw UserErrors.invalidContent("Conteudo invalido.");
    }

    if (postData.title.length <= 4) {
      throw UserErrors.invalidContent("Titulo invalido.");
    }

    if (postData.university.length <= 4) {
      throw UserErrors.invalidContent("Nome da universidade invalida.");
    }
    if (postData.image.length <= 4) {
      throw UserErrors.invalidContent("url da imagem não fornecida.");
    }
  }
}
