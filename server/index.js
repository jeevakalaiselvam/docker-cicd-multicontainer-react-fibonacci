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
        .query('CREATE TABLE IF NOT EXISTS values (number INT')
        .catch((err) => console.log(err));
});
