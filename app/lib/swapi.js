const config = require('../config')
const axios = require('axios')
const _ = require('lodash');

const swapi = axios.create({
    baseURL: config.swapi.url
})

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

const errorHandler = (message = 'Swapi error occurred') => err => {
    throw {
        message,
        error: err,
        status: err.status,
        data: []
    }
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
        }) => transformAndCacheMovie(data)).catch(errorHandler(`Error fetching movie with id: ${id}`));
    }
    return Promise.resolve(movie);
}

const getMovieCharacters = (movieId) => {
    return getMovieById(movieId).then((movie) => {
        return Promise.all(movie.characters.map(getCharactersByUrl))
    }).catch(errorHandler('Error fetching movie characters'));
};

const transformAndCacheCharacter = (character) => {
    const characterObj = {
        id: getIdFromUrl(character.url),
        name: character.name,
        gender: character.gender,
        height: isNaN(character.height) ? 0 : +character.height,
        mass: character.mass,
        hair_color: character.hair_color,
        skin_color: character.skin_color,
        eye_color: character.eye_color,
        birth_year: character.birth_year,
        homeworld: character.homeworld,
        url: character.url
    };
    swapiCache.set(character.url, characterObj);
    return characterObj;
};

const getCharactersByUrl = (url) => {
    const character = swapiCache.get(url);
    if (!character) {
        return axios.get(url).then(({
            data
        }) => transformAndCacheCharacter(data)).catch(errorHandler(`Error fetching character by url: ${url}`));
    }
    return Promise.resolve(character);
}

module.exports = {
    getMovies,
    getMovieCharacters,
    getMovieById
}