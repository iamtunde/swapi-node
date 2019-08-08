const config = require('../config')
const axios = require('axios')
const _ = require('lodash');

async function getMovies() {
    const getMovies = await axios.get(config.swapi.url + 'films/')

    let results = getMovies.data.results
    let movies = [];

    results.map((movie) => {
        movies.push({
            title: movie.title,
            opening_crawl: movie.opening_crawl,
            release_date: movie.release_date,
            url: movie.url
        });
    });

    return Promise.resolve(_.orderBy(movies, 'release_date', 'asc'))
}

async function getCharacters(req, res) {
    const getCharacters = await axios.get(config.swapi.url + 'people/')

    return getCharacters.data.results
}

async function filter(anchor, value) {
    return true
}

module.exports = {getMovies, getCharacters, filter}