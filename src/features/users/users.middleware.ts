import { prisma } from "#lib/prisma.ts";
import { env } from "#shared/env.ts";
import { HttpError } from "#shared/errors/HttpError.ts";
import { HttpStatus } from "#shared/status.ts";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  id: number;
}

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authentication = req.headers.authorization;
  const secret = env.JWT_SECRET;
  let token;
  if (authentication && authentication.startsWith("Bearer")) {
    token = authentication;
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    throw new HttpError(
      "Not Authorized, token not provided",
      HttpStatus.UNAUTHORIZED,
    );
  }
  if (!secret) {
    throw new HttpError("JWT secret not defined", HttpStatus.UNAUTHORIZED);
  }
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const user = await prisma.user.findUnique({
      where: { id: String(decoded.id) },
    });
    if (!user) {
      throw new HttpError("User is no longer exist", HttpStatus.NOT_FOUND);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
