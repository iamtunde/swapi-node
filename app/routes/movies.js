const express = require('express')
const route = express.Router()

//import moview controller
const movieController = require('../controllers/movie')

route.get('/', movieController.fetchAll)

module.exports = route;