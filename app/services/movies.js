const {getMovies, getMovieById} = require('../lib/swapi');
const fetchComment = require('./comments')['fetch']

const _ = require('lodash');

function all() {
    return getMovies().then(movies => {
        const sortedMovies = _.map(_.orderBy(movies, 'release_date', 'asc'), movie => _.omit(movie, 'characters'));

        return Promise.all(_.map(sortedMovies, movie => {
            return fetchComment({ movie_id: movie.id }).then(comment => {
                movie.total_comments = comment.length
                return movie
            })
        })).catch(err => {
            console.log(err)
            return err
        })
    })
}

function one(movieId) {
    return getMovieById(movieId).then(movie => {
        return fetchComment({ movie_id: movie.id }).then(comment => {
            movie.total_comments = comment.length
            return movie
        }).catch(err => {
            console.log(err)
            return err
        })
    })
}

module.exports = {all, one}