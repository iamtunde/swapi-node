//import the movies service
const {all} = require('../services/characters')

exports.fetchAll = (req, res) => {
    try {
        return all(req, res)
    } catch (e) {
        return res.status(500).json({
            message: 'An error has occured: ' + e.message,
            error: true,
            data: []
        })
    }
}