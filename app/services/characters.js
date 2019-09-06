const { getMovieCharacters } = require('../lib/swapi');
const _ = require('lodash');

//function converts cm values to ft,in value
function convertToFeet(cm) {
    if (isNaN(cm)){
        return null;
    }
    const actualValue = ((cm * 0.393700) / 12);
    const feet = Math.floor(actualValue);
    const inches = Math.round((actualValue - feet) * 12);

    return {
        feet: feet,
        inches: inches
    }
}

function heightInCM(results) {
    return results.reduce((total, character) => total + +character.height, 0)
}

function all({ movie_id, sortBy, sortDirection, filterBy, filterValue }) {
    return getMovieCharacters(movie_id).then(characters => {
        let results
        
        if(sortBy && filterBy) {
            //first we filter the characters
            filteredCharacters = characters.filter((character) => { return character.gender == filterValue})

            //now let's sort the filtered values
            sortCharacters = _.orderBy(filteredCharacters, sortBy, sortDirection)

            results = sortCharacters
        } else if(sortBy) {
            results = _.orderBy(characters, sortBy, sortDirection)
        } else if(filterBy) {
            results = characters.filter((character) => {
                return character.gender == filterValue
            })
        } else {
            results = characters
        }

        //converts the total height from CM to Ft & Inches
        const totalHeightInCM = results.reduce((total, currCharacter) => total + +currCharacter.height, 0)

        //construct meta_data object
        const meta_data = {
            total_characters: results.length,
            total_heights_in_cm: heightInCM(results),
            total_heights_in_feet: convertToFeet(totalHeightInCM)
        }

        return { results, meta_data };
    })
}

module.exports = {all} 