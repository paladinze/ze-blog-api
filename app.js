const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const Knex = require('knex');
const knexConfig = require('./knexfile');
const movieRoute = require('./routes/movie');
const {
  Model
} = require('objection');

// configure dotenv for load env variables
dotenv.config()

// get express instance
const app = express()

// config parser middleware
app.use(parser.urlencoded({
  extended: false
}))
app.use(parser.json())

// config cors middleware
app.use(cors())

// config routes
app.use('/movies', movieRoute)

// set port
app.set('port', process.env.PORT || 3000)


// initialize knex query builder
const knex = Knex(knexConfig);

// bind all models to the knex instance
Model.knex(knex);


// start the server
app.listen(app.get('port'), () => {
  console.log('server is up and running on port ' + app.get('port'));
})