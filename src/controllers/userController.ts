import { Response, Request } from "express";
import { PostDataI } from "../interfaces";
import { UserValidator } from "../validators/userValidator";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import UserService from "../services/userService";
import { StatusCodes } from "http-status-codes";
import UserErrors from "../errors/userErros";
import { PostDataT } from "../@types";

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

  async allPosts(req: Request, res: Response) {
    try {
      const allPosts = await userService.allPosts();

      return res.status(StatusCodes.OK).json(allPosts);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async onePost(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const posted = await userService.onePost(id);

      if (!posted) {
        console.log("Post nao encontrado.");
        throw UserErrors.postNotFound();
      }

      return res.status(StatusCodes.OK).json(posted);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const { content, image, isChanged, title, college } =
        req.body as PostDataT;
      userValidator.validate({ content, title, image, college });

      const updatedPost = await userService.updatePost(id, {
        content,
        image,
        isChanged,
        title,
        college,
      });

      if (!updatedPost) {
        throw UserErrors.postNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(updatedPost);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async postDeleted(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const postDeleted = await userService.deletePost(id);

      if (!postDeleted) {
        throw UserErrors.postNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(postDeleted);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async favoritePosts(req: Request, res: Response) {
    try {
      const { favorite } = req.params as unknown as { favorite: boolean };
      const bestPosts = await userService.favoritePosts(favorite);

      return res.status(StatusCodes.OK).json(bestPosts);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async collegeOfPosts(req: Request, res: Response) {
    try {
      const { college } = req.body as { college: string };
      userValidator.validateOnlyCollege(college);

      const bestPostsOfCollege = await userService.collegePosts(college);

      return res.status(StatusCodes.OK).json(bestPostsOfCollege);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async favoritePostsOfCollege(req: Request, res: Response) {
    try {
      const { favorite } = req.params as unknown as { favorite: boolean };
      const { college } = req.body as { college: string };
      userValidator.validateOnlyCollege(college);

      const bestPostsOfCollege = await userService.favoritePostsOfOneCollege(
        favorite,
        college
      );

      return res.status(StatusCodes.OK).json(bestPostsOfCollege);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async changeOneFavoritePost(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const favoritePostChanged = await userService.changeOneFavoritePost(id);

      if (!favoritePostChanged) {
        throw UserErrors.postNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(favoritePostChanged);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }
}
