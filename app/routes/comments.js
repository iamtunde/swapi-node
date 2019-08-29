const express = require('express')
const requestIp = require('request-ip');
const route = express.Router()

const ipMiddleware = function (req, res, next) {
    req.body.ip_address = requestIp.getClientIp(req);
    next();
};

const validator = require('../validators/comments')

//import moview controller
const commentController = require('../controllers/comment')

route.post('/', [validator.add, ipMiddleware], commentController.addComment)

module.exports = route;