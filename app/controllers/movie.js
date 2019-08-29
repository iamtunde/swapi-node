//import the movies service
const {all, one} = require('../services/movies')
const { getErrorCode } = require('../lib/utils')

exports.fetchAll = async (req, res) => {
    try {
        const movies = await all()
        return res.status(200).json({
            message: 'Movies successfully retrieved',
            error: [],
            data: movies
        })
    } catch(err) {
        return res.status(getErrorCode(err) || 400).json(err)
    }
    
}

exports.fetchOne = async (req, res) => {
    try {
        const movie = await one(req.params.movie_id)
        return res.status(200).json({
            message: 'Movie successfully retrieved',
            error: [],
            data: movie
        })
    } catch(err) {
        return res.status(getErrorCode(err) || 400).json(err)
    }
}