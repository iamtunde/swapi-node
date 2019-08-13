const config = require('../config')
const axios = require('axios')
const _ = require('lodash');

const swapi = axios.create({baseURL: config.swapi.url})

const getIdFromUrl = url => parseInt(url.substring(0, url.length - 1).split('/').pop())

function getMovies() {
    return swapi.get('films').then(response => {
        let results = response.data.results

        let movies = results.map((movie) => {
            let movieId = getIdFromUrl(movie.url)

            return {
                id: movieId,
                title: movie.title,
                opening_crawl: movie.opening_crawl,
                release_date: movie.release_date,
                url: movie.url
            };
        });

        return movies
    }).catch(err => {
        throw {
            message: 'Error fetching movies',
            error: err,
            data: []
        }
    });
}

function getCharacters() {
    return swapi.get('people').then(response => {
        const results = response.data.results

        let characters = results.map((character) => {
            if(character.gender !== 'n/a') {
                return {
                    id: getIdFromUrl(character.url),
                    name: character.name,
                    gender: character.gender,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    birth_year: character.birth_year,
                    homeworld: character.homeworld,
                    url: character.url
                }
            }
        })

        return characters.filter((character) => {
            return character != null
        })
    }).catch(err => {
        return {
            message: 'Error fetching characters',
            error: err,
            data: []
        }
    })
}

module.exports = {getMovies, getCharacters}