//import the movies service
const {all, one} = require('../services/movies')

exports.fetchAll = (req, res) => {
    all().then(response => {
        return res.status(200).json({
            message: 'Movies successfully retrieved',
            error: [],
            data: response
        })
    }).catch(err => {
        return res.status(400).json(err)
    })
}

exports.fetchOne = (req, res) => {
    one(req.params.movie_id).then(response => {
        if(response.data) {
            return res.status(200).json({
                message: 'Movie successfully retrieved',
                error: [],
                data: response
            })
        } else {
            return res.status(404).json({
                message: 'Movie not found',
                error: [],
                data: []
            })
        }
    }).catch(err => {
        return res.status(400).json(err)
    })
}