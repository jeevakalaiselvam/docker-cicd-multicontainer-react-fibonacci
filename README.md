# Multi Container Application

This is a simple multi container application with React, Node, Express, Redis and Postgres using Docker.
The applicatio uses React as Front end and Node Express as back end.
The application takes in user input and stores the data in Postgres, Uses Redis to cache the already visited values.

# Important Steps

    1. Setup all configuration for hosts, ports, username, password with help of environment variables
    2. Setup Redis worker to calculate heavy task in non blocking thread
    3. Configure Redis and Postgres using environment variables
    4. Create a Express server
        * Allow CORS
        * Use Body Parser to encode body into JSON
    5. Create connection to Postgres
        * Create the table in database

    6. Crate Redis client
        * Create a publisher for data

    7. Setup Route endpoints in Express as needed
        * Atleast one POST method handler to get data from user for calculation
