import express from 'express'
import { createPost, deletePost, editPost, getAllPosts, getPost } from './posts.controller';

const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getPost)

router.post('/create-post', createPost);

router.put('/:id', editPost);

router.delete('/:id', deletePost);

export default router;