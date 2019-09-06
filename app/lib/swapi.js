const { swapi_url } = require('../config')
const axios = require('axios')
const _ = require('lodash')
const { errorHandler } = require('./utils')

const swapi = axios.create({ baseURL: swapi_url })

const getIdFromUrl = url => parseInt(url.substring(0, url.length - 1).split('/').pop(), 10)

const swapiCache = Object.freeze({
    cache: {},
    get(key) {
        return this.cache[key];
    },
    set(key, value) {
        this.cache[key] = value;
    }
});

const transformAndCacheMovie = (movie) => {
    const movieId = getIdFromUrl(movie.url)
    const movieObj = Object.assign({
        id: movieId,
    }, _.pick(movie, ['title', 'opening_crawl', 'release_date', 'url', 'characters']));
    swapiCache.set(movieObj.id, movieObj);
    return movieObj;
}

const getMovies = () => {
    return swapi.get('films').then(response => {
        let results = response.data.results
        return results.map(transformAndCacheMovie);
    }).catch(errorHandler('Error fetching movies'));
}

const getMovieById = (id) => {
    const movie = swapiCache.get(id);
    if (!movie) {
        return swapi.get(`films/${id}`).then(({
            data
        }) => transformAndCacheMovie(data)).catch(errorHandler(`Can't find movie with id: ${id}`));
    }
    return Promise.resolve(movie);
}

const getMovieCharacters = (movieId) => {
    return getMovieById(movieId).then((movie) => {
        return Promise.all(movie.characters.map(getCharactersByUrl))
    }).catch(errorHandler('Error fetching movie characters'));
};

const transformAndCacheCharacter = (character) => {
    const characterId = getIdFromUrl(character.url)
    const characterHeight = isNaN(character.height) ? 0 : +character.height

    const characterObj = Object.assign({
        id: characterId,
        height: characterHeight,
    }, _.pick(character, ['name', 'gender', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'homeworld', 'url']));

    swapiCache.set(character.url, characterObj);
    return characterObj;
};

const getCharactersByUrl = (url) => {
    const character = swapiCache.get(url);
    if (!character) {
        return axios.get(url).then(({
            data
        }) => transformAndCacheCharacter(data)).catch(errorHandler(`Can't find character with the url: ${url}`));
    }
    return Promise.resolve(character);
}

module.exports = {
    getMovies,
    getMovieCharacters,
    getMovieById,
    errorHandler
}