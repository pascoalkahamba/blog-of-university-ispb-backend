import { Request, Response } from "express";
import { ICommentDataBoby, IUpdateCommentDataBoby } from "../interfaces";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { createCommentSchema, updateCommentSchema } from "../schemas";
import CommentService from "../services/commentService";
import { StatusCodes } from "http-status-codes";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { ZodError } from "zod";
import CommentValidator from "../validators/commentValidator";
import { CommentError } from "../errors/commentError";

const commentService = new CommentService();
const commentValidator = new CommentValidator();

export default class CommentController {
  async create(req: Request, res: Response) {
    try {
      const { postId } = req.params as unknown as { postId: number };
      const parseBody = req.body as ICommentDataBoby;
      const creatorId = req.id;
      const { content, whoCreator } = createCommentSchema.parse(parseBody);
      const commentCreated = await commentService.create({
        content,
        whoCreator,
        creatorId: +creatorId,
        postId: +postId,
      });

      return res.status(StatusCodes.CREATED).json(commentCreated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBoby = req.body as IUpdateCommentDataBoby;
      const { content } = updateCommentSchema.parse(parseBoby);
      const commentUpdated = await commentService.update(+id, content);

      if (!commentUpdated) {
        throw CommentError.commentNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(commentUpdated);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const commentDeleted = await commentService.delete(+id);

      if (!commentDeleted) {
        throw CommentError.commentNotFound();
      }
      return res.status(StatusCodes.ACCEPTED).json(commentDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        commentValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
