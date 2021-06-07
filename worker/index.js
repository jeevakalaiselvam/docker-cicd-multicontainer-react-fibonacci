const keys = require('./keys');
const redis = require('redis');

//Create a redis client using the configuration from keys file
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000, //If connection to redis is lost, Attempt to retry every 1000ms
});

//Create a duplicate client to redis
const sub = redisClient.duplicate();

//Create a recursive solution to calculate fibonacci values
const fibonacci = (index) => {
    if (index < 2) return 1;
    return fibonacci(index - 1) + fibonacci(index - 2);
};

//On message received, Store the index value in a HashSet
sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fibonacci(parseInt(message)));
});

//Subscribe to event insert
sub.subscribe('insert');
