import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import StudentValidator from "../validators/studentValidator";
import {
  createPostSchema,
  fileModalSchema,
  pictureModalSchema,
} from "../schemas";
import { handleError } from "../errors/handleError";
import PostService from "../services/postService";
import { IPostDataBoby } from "../interfaces";
import { PostError } from "../errors/postError";

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
        "file"
      );

      if (!posted) {
        throw PostError.titleOfPostAlreadyExist();
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
}
