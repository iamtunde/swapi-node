//import the movies service
const {all} = require('../services/characters')
const { getErrorCode } = require('../lib/utils')

exports.fetchAll = async (req, res) => {
    try {
        const { sortBy, sortDirection, filterBy, filterValue } = req.query
        const { movie_id } = req.params
    
        const characters = await all({ movie_id, sortBy, sortDirection, filterBy, filterValue })

        return res.status(200).json({
            message: 'Characters successfully retrieved',
            error: [],
            data: characters
        })
    } catch(err) {
        return res.status(getErrorCode(err) || 400).json(err)
    }
}