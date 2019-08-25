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

    return feet + 'ft and ' + inches + ' inches';
}

function all({ movie_id, sortBy, sortDirection, filterBy, filterValue }) {
    return getMovieCharacters(movie_id).then(characters => {
        let results
        
        if(sortBy && filterBy) {
            //first we filter the characters
            const params = {'gender': filterValue}
            filteredCharacters = _.filter(characters, params)

            //now let's sort the filtered values
            sortCharacters = _.orderBy(filteredCharacters, sortBy, sortDirection)

            results = sortCharacters
        } else if(sortBy) {
            results = _.orderBy(characters, sortBy, sortDirection)
        } else if(filterBy) {
            const params = {'gender': filterValue}
            results = _.filter(characters, params)
        } else {
            results = characters
        }

        //converts the total height from CM to Ft & Inches
        const totalHeightInCM = results.reduce((total, currCharacter) => total + +currCharacter.height, 0)

        //construct meta_data object
        const meta_data = {
            total_characters: results.length,
            total_heights_in_cm: totalHeightInCM + 'cm',
            total_heights_in_feet: convertToFeet(totalHeightInCM)
        }

        return { results, meta_data };
    })
}

module.exports = {all} 