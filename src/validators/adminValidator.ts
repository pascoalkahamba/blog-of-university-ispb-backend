import AdminError from "../errors/adminError";
import { AdminInfoI } from "../interfaces";

export default class AdminValidator {
  validator(adminInfo: AdminInfoI) {
    if (adminInfo.username.length <= 4) {
      throw AdminError.invalidInfo("Nome do admin está invalido.");
    }
    if (adminInfo.password.length <= 4) {
      throw AdminError.invalidInfo("Senha do admin está invalido.");
    }
    if (adminInfo.email.length <= 4) {
      throw AdminError.invalidInfo("Email do admin está invalido.");
    }
  }
}
