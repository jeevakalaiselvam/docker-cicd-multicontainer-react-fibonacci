# Multi Container Application

This is a simple multi container application with React, Node, Express, Redis, Nginx and Postgres using Docker.
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

    7. Setup and Create the React application
        * Setup a form to submit data to endpoint

# Docker Setup

    1. Create a Dev Dockerfile for each service (client, server and worker)

    2. Steps to create in each Dockerfile to prevent rebuild every single time
        * COPY package.json file
        * RUN npm install
        * COPY all other data
        * VOLUME setup reference to listen for changes

    3. Build the containers using command -> docker build -f Dockerfile.dev .

    4. Run the container and check if its working using command without errors -> docker run CONTAINER_IMAGE

    5. Create a docker compose to manage all services
        * Helps with configuring port mapping
        * Setup environment variables
        * Specify volume reference mapping
        * Manage links between containers
        * Uses Nginx to map requests between React or Express
