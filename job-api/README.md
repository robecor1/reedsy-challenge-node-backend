# reedsy-challenge-node-backend
# NodeJS API

## Setup

`npm install`

If you have a remote mongo dp add a `.env` file with the DB uri in the `MONGO_DB_URI` var, otherwise it will open a mongo db in memory

## Start

`npm start` - for normal dev server start

`npm run start:debug` - to start in debugging mode for memory check

`npm run start:production` - to start in production mode with pm2 for more clusters

`npm run stop:production` - to stop all pm2 clusters

## Test

`npm test` - for unit tests

`npm run test:coverage` - for unit tests with coverage

## Load test

### Note
- If you haven't provided a Mongo URI in the `.env` file the server will start a memory database that will affect the load tests
- For load tests we use the `artilery` package and the scripts can be found in the `./load-tests` directory

`npm run load-test:get` - to start the load for the GET endpoints
`npm run load-test:post` - to start the load for the POST endpoints
