const keys = require('./keys');

//Express Application Setup

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Postgres Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

//Error handler when connection to Postgres fails
pgClient.on('error', () => console.log('Lost PG connection'));

//Create a table to store the data in Postgres
pgClient.on('connect', (client) => {
    client
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.log(err));
});

//Redis Client Setup
const redis = require('redis');
const { response } = require('express');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000, //If connection is lost, Retry again in 1000ms
});

//Create redis publisher to publish data to redis subscribers
const redisPublisher = redisClient.duplicate();

//Express Route Handlers and Endpoint managers

//Server Root handler
app.get('/', (req, res) => {
    res.send('Hi');
});

//Route to obtain all fibonacci index stored in Postgres
app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values');
    res.send(values.rows);
});

//Route to obtain all the current fibonacci index in Redis
app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

//Obtain new values user post and store it
app.post('/values', async (req, res) => {
    const index = req.body.index;

    //Send back error to user that the index provided is too high to calculate
    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }

    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) VALUES ($1)', [index]);
    res.send({ working: true, index: index });
});

//Listen on port 5000
app.listen(5000, (err) => {
    console.log('Listening');
});
