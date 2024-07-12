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
      return AuthError.noTokenProvided();
    }

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      return AuthError.typeOfAuthInvalid();
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: number;
    };

    if (!id) {
      return AuthError.invalidToken();
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
