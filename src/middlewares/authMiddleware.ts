import { NextFunction, Request, Response } from "express";
import AuthError from "../errors/authErrors";
import jwtToken from "jsonwebtoken";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const typeOfAuth = req.headers.authorization;

    if (!typeOfAuth) {
      throw AuthError.tokenNotFound();
    }
    const [type, token] = typeOfAuth.split("");

    if (type !== "bear") {
      throw AuthError.typeOfAuthInvalid();
    }

    if (token.length <= 0) {
      throw AuthError.tokenNotAccept();
    }

    const { id } = jwtToken.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as {
      id: string;
    };

    if (!id) {
      throw AuthError.tokenNotAccept();
    }
    req.id = id;

    next();
  } catch (error) {
    return handleError(error as BaseError, res);
  }
}
