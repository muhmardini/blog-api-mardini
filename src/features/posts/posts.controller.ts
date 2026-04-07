import { prisma } from "#lib/prisma.ts";
import { exist } from "#shared/check.ts";
import { HttpError } from "#shared/errors/HttpError.ts";
import { HttpStatus } from "#shared/status.ts";
import {
  PostBody,
  PostsParams,
  UserParams,
} from "#shared/types/Request.type.ts";
import { NextFunction, Request, Response } from "express";

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany();
    if (!posts) {
      throw new HttpError("There is no posts yet", HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (
  req: Request<UserParams, any, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: { id: String(id) },
    });
    if (!post) {
      throw new HttpError("Sorry post can't be found", HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

const createPost = async (
  req: Request<{}, any, PostBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, body, imageUrl } = req.body;
    const authorId = req.user?.id;

    exist(title);
    exist(body);

    const createdPost = await prisma.post.create({
      data: {
        title,
        body,
        author: {
          connect: { id: authorId },
        },
      },
    });
    return res.status(HttpStatus.CREATED).json({
      status: "success",
      data: createdPost,
      message: "Post has been created",
    });
  } catch (error) {
    next(error);
  }
};

const editPost = async (
  req: Request<PostsParams, any, PostBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, body, imageUrl } = req.body;
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: { id: String(id) },
    });
    if (!post) {
      throw new HttpError("The post is not available", HttpStatus.NOT_FOUND);
    }
    const updatedPost = await prisma.post.update({
      where: { id: String(id) },
      data: {
        title,
        body,
        imageUrl,
      },
    });
    return res.status(HttpStatus.OK).json({
      status: "success",
      data: updatedPost,
      message: "Post has been updated",
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (
  req: Request<PostsParams, any, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
      where: { id: String(id) },
    });
    if (!post) {
      throw new HttpError("post is not available", HttpStatus.NOT_FOUND);
    }
    const deletedPost = await prisma.post.delete({
      where: { id: String(id) },
    });
    return res.status(HttpStatus.OK).json({
      status: "success",
      data: deletedPost,
      message: "Post has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

export {getAllPosts, getPost, createPost, editPost, deletePost}