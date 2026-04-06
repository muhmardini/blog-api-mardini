import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { env } from "#shared/env.ts";

export const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId };
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN || "7d",
  };
  const token = jwt.sign(payload, env.JWT_SECRET, options);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: (1000*60*60*24)*7 // 7days
  })
};
