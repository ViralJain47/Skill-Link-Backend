import {config} from "../../config/env.js" 
import {Redis} from 'ioredis'
import logger from "./logger.js";
let client;

(async () => {
    try {
        client = new Redis(config.upstashUrl)
        logger.info("REDIS UPSTASH SETUP COMPLETE")
    } catch (error) {
       logger.error(error.message)
    }
    
})();

export default client;