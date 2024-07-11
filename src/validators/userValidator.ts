import { PostDataT } from "../@types";
import UserErrors from "../errors/studantErros";

export class UserValidator {
  validate(postData: PostDataT) {
    if (postData.content.length <= 4) {
      throw UserErrors.invalidContent("Conteudo invalido.");
    }

    if (postData.title.length <= 4) {
      throw UserErrors.invalidContent("Titulo invalido.");
    }

    if (postData.college.length <= 4) {
      throw UserErrors.invalidContent("Nome da faculdade invalida.");
    }
    if (postData.image.length <= 4) {
      throw UserErrors.invalidContent("url da imagem não fornecida.");
    }
  }

  validateOnlyCollege(college: string) {
    if (college.length <= 4) {
      throw UserErrors.invalidContent("Nome da faculdade invalida.");
    }
  }
}
