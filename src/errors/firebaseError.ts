import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class FirebaseErrors {
  static firebaseErrorUpload() {
    return new BaseError(
      "Algo deu errado ao fazer upload com o firebase storage",
      StatusCodes.BAD_REQUEST
    );
  }
}
