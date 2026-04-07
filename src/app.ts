import express from 'express'
import authRoutes from '#/features/auth/auth.routes'
import usersRoutes from '#/features/users/users.routes'
import postsRoutes from '#/features/posts/posts.routes'
import { userMiddleware } from '#features/users/users.middleware.ts';
const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use('/auth', authRoutes)
app.use('/users', userMiddleware, usersRoutes)
app.use('/posts', userMiddleware, postsRoutes)

export default app;