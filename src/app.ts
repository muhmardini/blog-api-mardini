import express from 'express'
import authRoutes from '#/features/auth/auth.routes'
import usersRoutes from '#/features/users/users.routes'
import postsRoutes from '#/features/posts/posts.routes'
import { authMiddleware } from '#middlewares/auth.middleware.ts';
import globalErrorMiddleware from '#middlewares/globalError.middleware.ts';
const app = express();

app.use(express.json());
app.use(express.urlencoded());


app.use('/auth', authRoutes)
app.use('/users', authMiddleware, usersRoutes)
app.use('/posts', authMiddleware, postsRoutes)

app.use(globalErrorMiddleware)

export default app;