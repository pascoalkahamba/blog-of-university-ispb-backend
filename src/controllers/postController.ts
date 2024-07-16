import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import StudentValidator from "../validators/studentValidator";
import {
  createPostSchema,
  deletePostSchema,
  fileModalSchema,
  pictureModalSchema,
} from "../schemas";
import { handleError } from "../errors/handleError";
import PostService from "../services/postService";
import { IPostDataBoby } from "../interfaces";
import { PostError } from "../errors/postError";
import { StatusCodes } from "http-status-codes";

const postValidator = new StudentValidator();
const postService = new PostService();

export default class PostContorller {
  async create(req: Request, res: Response) {
    try {
      const { fileModal, pictureModal, postData } = req.body as IPostDataBoby;
      const {
        content,
        createrPostId,
        kindOfFile,
        nameOfDepartment,
        title,
        whoPosted,
      } = createPostSchema.parse(postData);
      const {
        content: fileContent,
        mimeType,
        name,
        postId,
        size,
      } = fileModalSchema.parse(fileModal);
      const {
        content: pictureContent,
        height,
        mimeType: mimeTypePicture,
        postId: postIdPiture,
        size: sizePicture,
        width,
      } = pictureModalSchema.parse(pictureModal);

      const posted = await postService.createPost(
        {
          content,
          createrPostId,
          kindOfFile,
          title,
          nameOfDepartment,
          whoPosted,
        },
        { content: fileContent, mimeType, name, postId, size },
        {
          content: pictureContent,
          height,
          mimeType: mimeTypePicture,
          postId: postIdPiture,
          size: sizePicture,
          width,
        },
        postData.kindOfFile
      );

      if (!posted) {
        throw PostError.titleOfPostAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(posted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = deletePostSchema.parse(+req.params);
      const { fileModal, pictureModal, postData } = req.body as IPostDataBoby;
      const {
        content,
        createrPostId,
        kindOfFile,
        nameOfDepartment,
        title,
        whoPosted,
      } = createPostSchema.parse(postData);
      const {
        content: fileContent,
        mimeType,
        name,
        postId,
        size,
      } = fileModalSchema.parse(fileModal);
      const {
        content: pictureContent,
        height,
        mimeType: mimeTypePicture,
        postId: postIdPiture,
        size: sizePicture,
        width,
      } = pictureModalSchema.parse(pictureModal);

      const posteUpdated = await postService.updatePost(
        {
          content,
          createrPostId,
          kindOfFile,
          title,
          id,
          nameOfDepartment,
          whoPosted,
        },
        { content: fileContent, mimeType, name, postId, size },
        {
          content: pictureContent,
          height,
          mimeType: mimeTypePicture,
          postId: postIdPiture,
          size: sizePicture,
          width,
        },
        postData.kindOfFile
      );

      if (!posteUpdated) {
        throw PostError.titleOfPostAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(posteUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = deletePostSchema.parse(req.params);
      const postedDeleted = await postService.deletePost(+id);

      if (!postedDeleted) {
        throw PostError.postNotFound();
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const allPosts = await postService.getAllPosts();

      return res.status(StatusCodes.OK).json(allPosts);
    } catch (error) {
      return handleError(error as BaseError, res);
    }
  }

  async getOnePost(req: Request, res: Response) {
    try {
      const { id } = deletePostSchema.parse(req.params);
      const post = await postService.getOnePost(+id);

      if (!post) {
        throw PostError.postNotFound();
      }

      return res.status(StatusCodes.OK).json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
