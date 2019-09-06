//import the movies service
const {add, fetch} = require('../services/comments')
const { getErrorCode } = require('../lib/utils')

exports.addComment = async (req, res) => {
    try {
        const comment = await add(req.body)
        return res.status(200).json({
            message: 'Comment sucessfully added',
            data: comment
        })
    } catch(err) {
        return res.status(getErrorCode(err) || 400).json(err)
    }
}

exports.fetchComments = async (req, res) => {
    try {
        const param = {movie_id: req.params.movie_id}
        const comments = await fetch(param)
        
        return res.status(200).json({
            message: 'Comments successfully retrieved',
            data: comments
        })
    } catch(err) {
        return res.status(getErrorCode(err) || 400).json(err)
    }
}