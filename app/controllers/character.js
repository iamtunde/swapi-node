//import the movies service
const {all} = require('../services/characters')

exports.fetchAll = (req, res) => {
    const { sortBy, sortDirection, filterBy, filterValue } = req.query;
    const { movie_id } = req.params;

    all({ movie_id, sortBy, sortDirection, filterBy, filterValue }).then(characters => {
        return res.status(200).json({
            message: 'Characters successfully retrieved',
            error: [],
            data: characters
        })
    }).catch(err => {
        return res.status(err.error.statusCode || 400).json(err)
    })
}