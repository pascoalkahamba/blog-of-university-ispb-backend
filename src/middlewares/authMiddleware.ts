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
      AuthError.noTokenProvided();
      return;
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      handleError(AuthError.typeOfAuthInvalid(), res);
      return;
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: number;
    };

    if (!id) {
      AuthError.invalidToken();
      return;
    }

    req.id = id;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      const errorMessage = error.message as TJsonWebTokenError;

      if (errorMessage === "jwt malformed") {
        handleError(AuthError.invalidToken(), res);
        return;
      }

      if (errorMessage === "jwt must be provided") {
        handleError(AuthError.noTokenProvided(), res);
        return;
      }
    }
  }
}
