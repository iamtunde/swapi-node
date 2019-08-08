const express = require('express')
const route = express.Router()

//import moview controller
const characterController = require('../controllers/character')

route.get('/', characterController.fetchAll)

module.exports = route;