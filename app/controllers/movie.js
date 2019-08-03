//import the movies service
const {all, one} = require('../services/movies')

exports.fetchAll = (req, res) => {
    all().then(response => {
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