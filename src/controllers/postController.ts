import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import { addLikeSchema, addUnlikeSchema, createPostSchema } from "../schemas";
import { handleError } from "../errors/handleError";
import PostService from "../services/postService";
import { ILike, IPostDataBoby, IUnlike } from "../interfaces";
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
      const { content, departmentId, title, whoPosted } =
        req.body as IPostDataBoby;
      const file = req.file;
      const createrId = req.id;
      let fileUrl = "";
      const formadata = createPostSchema.parse({
        content,
        departmentId: +departmentId,
        title,
        whoPosted,
      });

      if (file) {
        const storageRef = ref(
          storage,
          `pictures/${Date.now()}-${file.originalname}`
        );
        const metadata = {
          contentType: file.mimetype,
        };

        const snapshot = await uploadBytesResumable(
          storageRef,
          file.buffer,
          metadata
        );
        fileUrl = await getDownloadURL(snapshot.ref);
      }

      console.log("createrId", createrId);
      const posted = await postService.createPost(
        { ...formadata, createrPostId: createrId },
        {
          name: file?.originalname ?? "Nome_default",
          url: fileUrl,
        }
      );
      if (!posted) {
        throw PostError.titleOfPostAlreadyExist();
      }

      console.log("post criado");
      return res.status(StatusCodes.CREATED).json(posted);
    } catch (error) {
      if (error instanceof multer.MulterError) {
        return MulterErrors.multerErrorFile();
      } else if (error instanceof StorageError) {
        return FirebaseErrors.firebaseErrorUpload();
      } else if (error instanceof ZodError) {
        const validationError = fromError(error);
        console.log("error", error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        postValidator.validator(pathError, res);
      } else {
        console.log("error", error);
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const { content, departmentId, title, whoPosted } =
        req.body as IPostDataBoby;
      const file = req.file;
      const createrId = req.id;
      let fileUrl = "";
      const formadata = createPostSchema.parse({
        content,
        departmentId: +departmentId,
        title,
        whoPosted,
      });

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
          ...formadata,
          createrPostId: createrId,
          id: +id,
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
        console.log("error", error);
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const postedDeleted = await postService.deletePost(+id);
      if (!postedDeleted) {
        throw PostError.postNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(postedDeleted);
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
      const { id } = req.params as unknown as { id: number };
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

  async addLike(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as ILike;
      const { like, statusLike } = addLikeSchema.parse(parseBody);
      const postLiked = await postService.addLike({
        id: +id,
        like: +like,
        statusLike,
      });

      if (!postLiked) {
        throw PostError.postNotFound();
      }

      return res.status(StatusCodes.CREATED).json(postLiked);
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
  async addUnlike(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as IUnlike;
      const { unlike, statusUnlike } = addUnlikeSchema.parse(parseBody);
      const posteUnliked = await postService.addUnlike({
        id: +id,
        unlike: +unlike,
        statusUnlike,
      });

      if (!posteUnliked) {
        throw PostError.postNotFound();
      }

      return res.status(StatusCodes.CREATED).json(posteUnliked);
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
