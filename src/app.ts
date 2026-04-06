import express from 'express'
import authRoutes from '#/features/auth/auth.routes'
import usersRoutes from '#/features/users/users.routes'
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)

export default app;