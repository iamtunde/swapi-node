//import the movies service
const {all, one} = require('../services/movies')
const { getErrorCode } = require('../lib/utils')

exports.fetchAll = (req, res) => {
    all().then(response => {
        return res.status(200).json({
            message: 'Movies successfully retrieved',
            error: [],
            data: response
        })
    }).catch(err => {
        return res.status(getErrorCode(err) || 400).json(err)
    })
}

exports.fetchOne = (req, res) => {
    one(req.params.movie_id).then(response => {
        return res.status(200).json({
            message: 'Movie successfully retrieved',
            error: [],
            data: response
        })
    }).catch(err => {
        return res.status(getErrorCode(err) || 400).json(err)
    })
}