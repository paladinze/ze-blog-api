const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const Knex = require('knex');
const knexConfig = require('./knexfile');
const {
  Model
} = require('objection');

// configure dotenv for load env variables
dotenv.config()

// get express instance
const app = express()

// config parser middleware
app.use(parser.urlencoded({
  extended: true
}))
app.use(parser.json())
app.set('port', process.env.PORT || 3000)

// config cors middleware
app.use(cors())


// initialize knex query builder
const knex = Knex(knexConfig);

// bind all models to the knex instance
Model.knex(knex);


// start the server
app.listen(app.get('port'), () => {
  console.log('server is up and running on port ' + app.get('port'));
})