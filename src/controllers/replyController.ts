import { Request, Response } from "express";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import { handleError } from "../errors/handleError";
import {
  ILike,
  IReplyDataBoby,
  IUnlike,
  IUpdateCommentDataBoby,
} from "../interfaces";
import {
  addLikeSchema,
  addUnlikeSchema,
  createCommentSchema,
  updateCommentSchema,
} from "../schemas";
import CommentValidator from "../validators/commentValidator";
import ReplyService from "../services/replyService";
import { StatusCodes } from "http-status-codes";
import { ReplyError } from "../errors/replyError";

const commentValidator = new CommentValidator();
const replyService = new ReplyService();

export default class ReplyController {
  async create(req: Request, res: Response) {
    try {
      const { commentId } = req.params as unknown as { commentId: number };
      const creatorId = req.id;
      const parseBoby = req.body as IReplyDataBoby;
      const { content, whoCreator } = createCommentSchema.parse(parseBoby);
      const replyCreated = await replyService.create({
        commentId: +commentId,
        content,
        creatorId: +creatorId,
        whoCreator,
      });

      return res.status(StatusCodes.CREATED).json(replyCreated);
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
      const parseBody = req.body as IUpdateCommentDataBoby;
      const { content } = updateCommentSchema.parse(parseBody);
      const replyUdpated = await replyService.udpate(+id, content);

      if (!replyUdpated) {
        throw ReplyError.replyNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(replyUdpated);
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
      const replyDeleted = await replyService.delete(+id);

      if (!replyDeleted) {
        throw ReplyError.replyNotFound();
      }

      return res.status(StatusCodes.ACCEPTED).json(replyDeleted);
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

  async addLike(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as ILike;
      const { like, statusLike } = addLikeSchema.parse(parseBody);
      const repyLiked = await replyService.addLike({
        id: +id,
        like: +like,
        statusLike,
      });

      if (!repyLiked) {
        throw ReplyError.replyNotFound();
      }

      return res.status(StatusCodes.CREATED).json(repyLiked);
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
  async addUnlike(req: Request, res: Response) {
    try {
      const { id } = req.params as unknown as { id: number };
      const parseBody = req.body as IUnlike;
      const { unlike, statusUnlike } = addUnlikeSchema.parse(parseBody);
      const replyUnliked = await replyService.addUnlike({
        id: +id,
        unlike: +unlike,
        statusUnlike,
      });

      if (!replyUnliked) {
        throw ReplyError.replyNotFound();
      }

      return res.status(StatusCodes.CREATED).json(replyUnliked);
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
