# Multi Container Application

This is a simple multi container application with React, Node, Express, Redis and Postgres using Docker.
The applicatio uses React as Front end and Node Express as back end.
The application takes in user input and stores the data in Postgres, Uses Redis to cache the already visited values.

# Important Steps

    1. Setup all configuration details for Redis, Postgres
        * Host
        * Port
        * Username
        * Password
        * Database

    2. Setup Redis worker to calculate heavy task in non blocking thread
        * Setup a subscriber to handle new data
        * Calculate fibonacci number for given number

    3. Create a Express server
        * Allow CORS
        * Use Body Parser to encode body into JSON

    4. Create connection to Postgres
        * Create the table in database

    5. Create Redis client
        * Create a publisher for data

    6. Setup Route endpoints in Express as needed
        * Atleast one POST method handler to get data from user for calculation
