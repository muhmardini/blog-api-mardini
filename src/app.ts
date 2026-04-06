import express from 'express'
import authRoutes from '#/features/auth/auth.routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', authRoutes)

export default app;