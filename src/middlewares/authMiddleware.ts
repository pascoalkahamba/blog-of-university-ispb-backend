import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/authErrors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { handleError } from "../errors/handleError";
import { TJsonWebTokenError } from "../@types";
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return handleError(AuthError.noTokenProvided(), res);
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return handleError(AuthError.typeOfAuthInvalid(), res);
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: number;
    };

    if (!id) {
      return handleError(AuthError.invalidToken(), res);
    }

    req.id = id;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      const errorMessage = error.message as TJsonWebTokenError;

      if (errorMessage === "jwt malformed") {
        return handleError(AuthError.invalidToken(), res);
      }

      if (errorMessage === "jwt must be provided") {
        return handleError(AuthError.noTokenProvided(), res);
      }
    }
  }
}
