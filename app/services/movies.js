const apiHelper = require('../config/api')
const axios = require('axios')
const _ = require('lodash');

async function all() {
    let getMovies = await axios.get(apiHelper.baseUrl + 'films/')

    let movies = getMovies.data.results

    //collect all sorted items in an array
    let data = []

    for (const movie in movies) {
        if (movies.hasOwnProperty(movie)) {
            let item = movies[movie];
            
            const store = {title: item.title, opening_crawl: item.opening_crawl, release_date: item.release_date, url: item.url}

            data.push(store)
        }
    }
    

    return Promise.resolve(_.orderBy(data, 'release_date', 'asc'))
}

function one(params) {
    return params
}

module.exports = {all, one}