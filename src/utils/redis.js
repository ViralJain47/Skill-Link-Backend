import redis from 'redis'
let client;

(async () => {
    try {
        client = redis.createClient();
        await client.connect();
        console.log("redis client connected")
    } catch (error) {
        console.log(error)
    }
    
})();

export default client;