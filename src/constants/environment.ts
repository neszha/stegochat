import dotenv from 'dotenv'

dotenv.config()

/**
 * Applications
 */
export const APP_PORT: number = Number(process.env.APP_PORT ?? 8080)
export const APP_BASE_URL: string = process.env.APP_BASE_URL ?? ''
export const ROOT_PATH = process.cwd()

/**
 * Databases
 */
export const REDIS_DATABASE_URL: string = process.env.REDIS_DATABASE_URL ?? ''
