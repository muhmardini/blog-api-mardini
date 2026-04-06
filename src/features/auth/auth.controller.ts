import { Request, Response } from "express";
import { exist } from "#/shared/check.ts";
import { HttpStatus } from "#shared/status.ts";
import { prisma } from "#lib/prisma.ts";
import { HttpError } from "#shared/errors/HttpError.ts";
import { generateToken } from "#shared/jwt/generateToken.ts";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  exist(name);
  exist(email);
  exist(password);
  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });
  if (userExist) {
    throw new HttpError("email already exist", HttpStatus.UNPROCESSABLE_ENTITY);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  const token = generateToken(user.id, res);
  return res.status(HttpStatus.CREATED).json({
    status: "success",
    message: "Account has been created",
    data: {
      user: {
        name,
        email,
      },
      token,
    },
  });
};



const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  exist(email);
  exist(password);
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    throw new HttpError("invalid email or password", HttpStatus.NOT_FOUND);
  }
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new HttpError("Invalid email or Password", HttpStatus.NOT_FOUND);
  }
  const token = generateToken(user.id, res);
  return res.status(HttpStatus.OK).json({
    status: "success",
    data: {
      user: {
        name: user.name,
        email,
      },
      token,
    },
  });
};

export {register, login}