import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import { createPostSchema, deletePostSchema } from "../schemas";
import { handleError } from "../errors/handleError";
import PostService from "../services/postService";
import { IPostDataBoby } from "../interfaces";
import { PostError } from "../errors/postError";
import { StatusCodes } from "http-status-codes";
import { storage } from "../config/firebaseConfig";
import multer from "multer";
import { MulterErrors } from "../errors/multerError";
import PostValidator from "../validators/postValidator";
import { FirebaseErrors } from "../errors/firebaseError";
import {
  ref,
  StorageError,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const postValidator = new PostValidator();
const postService = new PostService();

export default class PostContorller {
  async create(req: Request, res: Response) {
    try {
      const postData = req.body as IPostDataBoby;
      const file = req.file;
      console.log("upload file", file);
      console.log("postData", postData);
      console.log("title", postData.title);
      console.log("content", postData.content);
      const createrId = req.id;
      let fileUrl = "";
      const { content, nameOfDepartment, title, whoPosted } =
        createPostSchema.parse(postData);
      console.log("pascoal zod");

      if (file) {
        const storageRef = ref(
          storage,
          `pictures/${Date.now()}-${file.originalname}`
        );
        const metadata = {
          contentType: file.mimetype,
        };
        console.log("storageRef", storageRef);

        const snapshot = await uploadBytesResumable(
          storageRef,
          file.buffer,
          metadata
        );
        console.log("snapshot", snapshot);
        fileUrl = await getDownloadURL(snapshot.ref);
        console.log("fileUrl", fileUrl);
      }

      const posted = await postService.createPost(
        {
          content,
          createrPostId: createrId,
          title,
          nameOfDepartment,
          whoPosted,
        },
        {
          name: file?.originalname ?? "Nome_default",
          url: fileUrl,
        }
      );

      if (!posted) {
        throw PostError.titleOfPostAlreadyExist();
      }
      console.log("upload feito");
      return res.status(StatusCodes.CREATED).json(posted);
    } catch (error) {
      if (error instanceof multer.MulterError) {
        console.log("multer error", error);
        return MulterErrors.multerErrorFile();
      } else if (error instanceof StorageError) {
        console.log("Storage Error", error);
        return FirebaseErrors.firebaseErrorUpload();
      } else if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        console.log("error zod", pathError);
        postValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = deletePostSchema.parse(+req.params);
      const postData = req.body as IPostDataBoby;
      const file = req.file;
      const createrId = req.id;
      let fileUrl = "";
      const { content, nameOfDepartment, title, whoPosted } =
        createPostSchema.parse(postData);
      if (file) {
        const storageRef = ref(
          storage,
          `pictures/${Date.now()}-${file.originalname}`
        );
        const metadata = {
          contentType: file.mimetype,
        };

        const uploadFile = await uploadBytesResumable(
          storageRef,
          file.buffer,
          metadata
        );

        fileUrl = await getDownloadURL(uploadFile.ref);
      }

      const posteUpdated = await postService.updatePost(
        {
          content,
          createrPostId: createrId,
          title,
          id,
          nameOfDepartment,
          whoPosted,
        },
        {
          name: file?.originalname ?? "Default_name",
          url: fileUrl,
        }
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
