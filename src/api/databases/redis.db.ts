import { createClient } from 'redis'
import { REDIS_DATABASE_URL } from '../../constants/environment'

/**
 * Prepare connections to Redis Server.
 */
const redis = createClient({
    url: REDIS_DATABASE_URL
})

export default redis
