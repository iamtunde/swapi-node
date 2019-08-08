const {getMovies} = require('../lib/swapi');

function all(req, res) {
    getMovies().then(response => {
        return res.status(200).json({
            message: 'Movies successfully retrieved',
            error: false,
            data: response
        })
    }).catch((err) => {
        return res.status(400).json({
            message: 'An error as occured: ' + err,
            error: true,
            data: []
        })
    })
}

function one(params) {
    return params
}

module.exports = {all, one}