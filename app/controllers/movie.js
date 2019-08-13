//import the movies service
const {all} = require('../services/movies')

exports.fetchAll = (req, res) => {
    all().then(response => {
        return res.status(200).json({
            message: 'Movies successfully retrieved',
            error: [],
            data: response
        })
    }).catch((err) => {
        return res.status(400).json(err)
    })
}