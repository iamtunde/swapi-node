const {getCharacters} = require('../lib/swapi');

function all(req, res) {
    getCharacters().then(response => {
        return res.status(200).json({
            message: 'Characters successfully retrieved',
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

module.exports = {all}