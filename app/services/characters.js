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
        
        if(sortBy) {
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
            total_heights: {
                cm: totalHeightInCM + 'cm',
                ft: convertToFeet(totalHeightInCM)
            }
        }

        return { results, meta_data };
    })
}

module.exports = {all} 