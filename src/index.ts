import 'dotenv/config'
import app from '#/app'
import { env } from './shared/env'

app.listen(env.PORT, () => {
    console.log(`server is running on port ${env.PORT}`);
})