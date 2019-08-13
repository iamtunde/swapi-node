//import the movies service
const {all} = require('../services/characters')

exports.fetchAll = (req, res) => {
    all(req).then(characters => {
        return res.status(200).json({
            message: 'Characters successfully retrieved',
            error: [],
            data: characters
        })
    }).catch(err => {
        return res.status(400).json(err)
    })
}