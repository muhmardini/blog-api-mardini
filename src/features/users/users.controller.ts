import { prisma } from "#lib/prisma.ts";
import { HttpError } from "#shared/errors/HttpError.ts";
import { HttpStatus } from "#shared/status.ts";
import { UserBody, UserParams } from "#shared/types/Request.type.ts";
import { NextFunction, Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    res.status(HttpStatus.OK).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (
  req: Request<UserParams, any, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });
    if (!user) {
      throw new HttpError("User does not exist", HttpStatus.NOT_FOUND);
    }
    res.status(HttpStatus.OK).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (
  req: Request<UserParams, any, Omit<UserBody, "password">>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });
    if (!user) {
      throw new HttpError("User does not exist", HttpStatus.NOT_FOUND);
    }
    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: {
        name: name,
        email: email,
      },
    });
    return res.status(HttpStatus.OK).json({
      status: "success",
      data: updatedUser,
      message: "user updated",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (
  req: Request<UserParams, any, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });
    if (!user) {
      throw new HttpError("User does not exist", HttpStatus.NOT_FOUND);
    }
    const deletedUser = await prisma.user.delete({
      where: { id: String(id) },
    });
    if (!deletedUser) {
      throw new HttpError(
        "Sorry Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res.status(HttpStatus.OK).json({
      status: "success",
      message: `User with ${deleteUser.name} username has been Deleted`,
    });
  } catch (error) {
    next(error);
  }
};

export {getAllUsers, getUser, updateUser, deleteUser}