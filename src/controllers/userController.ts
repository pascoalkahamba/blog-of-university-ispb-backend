import { Response, Request } from "express";
import { PostDataI } from "../interfaces";
import { UserValidator } from "../validators/userValidator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import UserService from "../service/userService";
import { StatusCodes } from "http-status-codes";
import UserErrors from "../errors/userErros";

const userValidator = new UserValidator();
const userService = new UserService();
export default class UserController {
  async create(req: Request, res: Response) {
    try {
      const newPost = req.body as PostDataI;
      userValidator.validate(newPost);

      const posted = await userService.create(newPost);
      console.log("newPost", newPost);

      if (!posted) {
        console.log("Este titulo ja foi adicionado.");
        throw UserErrors.invalidContent("Este titulo ja existe");
      }

      return res.status(StatusCodes.CREATED).json({
        message: "Post criado.",
        data: posted,
      });
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
