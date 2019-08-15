const express = require('express')
const route = express.Router()

//import moview controller
const movieController = require('../controllers/movie')
const characterController = require('../controllers/character')
const commentController = require('../controllers/comment')

route.get('/', movieController.fetchAll)
route.get('/:movie_id', movieController.fetchOne)
route.get('/:movie_id/characters', characterController.fetchAll)
route.get('/:movie_id/comments', commentController.fetchComments);

module.exports = route;