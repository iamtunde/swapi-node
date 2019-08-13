const {getMovies} = require('../lib/swapi');
const _ = require('lodash');

function all() {
    return getMovies().then(movies => {
        return _.orderBy(movies, 'release_date', 'asc')
    })
}

function one(params) {
    return params
}

module.exports = {all, one}