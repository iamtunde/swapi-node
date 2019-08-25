const {getMovies, getMovieById} = require('../lib/swapi');
const fetchComment = require('./comments')['fetch']

const _ = require('lodash');

function all() {
    return getMovies().then(movies => {
        const omittedCharacters = []

        movies.map((movie) => {
            movie = _.omit(movie, 'characters')
            omittedCharacters.push(movie)
        });

        const sortedMovies = _.orderBy(omittedCharacters, 'release_date', 'asc')
        
        return Promise.all(sortedMovies.map((movie) => {
            return fetchComment({movie_id: movie.id}).then(comment => {
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