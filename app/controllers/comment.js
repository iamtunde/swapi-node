//import the movies service
const {add, fetch} = require('../services/comments')

exports.addComment = (req, res) => {
    return add(req.body).then(comment => {
        return res.status(200).json({
            message: 'Comment sucessfully added',
            error: [],
            data: comment
        })
    }).catch(err => {
        return res.status(400).json(err)
    })
}

exports.fetchComments = (req, res) => {
    const param = {movie_id: req.params.movie_id}

    return fetch(param).then(comments => {
        return res.status(200).json({
            message: 'Comments successfully retrieved',
            error: [],
            data: comments
        })
    }).catch(err => {
        console.log(err)
        return res.status(400).json(err)
    })
}