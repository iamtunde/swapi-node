'use strict'

const express = require('express')
const bodyParser = require('body-parser')

//initialize the env variables
require('dotenv').config()

//initialize the app
const app = express()

//using body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3030

//require the routes dir. with the different routes
const routes = require('../app/routes');

//now mount the routes
app.use(routes);

app.listen(port, () => {
    console.log('Server running on port: ' + port)
})