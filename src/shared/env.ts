import 'dotenv/config'

const requireEnv = (name: string) => {
    const value = process.env[name];
    if(!value){
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value
}

export const env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: requireEnv('DATABASE_URL'),
    DIRECT_URL: requireEnv('DIRECT_URL'),
    JWT_SECRET: requireEnv('JWT_SECRET') as string,
    JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN as any) || '7d',
}