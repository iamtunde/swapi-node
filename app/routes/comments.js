const express = require('express')
const requestIp = require('request-ip');
const route = express.Router()

const ipMiddleware = function (req, res, next) {
    req.body.ip_address = requestIp.getClientIp(req);
    next();
};



//import moview controller
const commentController = require('../controllers/comment')

route.post('/', ipMiddleware, commentController.addComment)

module.exports = route;