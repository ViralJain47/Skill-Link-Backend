import {config} from "../../config/env.js" 
import {Redis} from 'ioredis'
let client;

(async () => {
    try {
        client = new Redis(config.upstashUrl)
        console.log("redis client connected")
    } catch (error) {
        console.log(error)
    }
    
})();

export default client;