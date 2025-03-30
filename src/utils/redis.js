import redis from 'redis'
const client = redis.createClient();

(async () => { 
    client.connect();
})();

export default client;