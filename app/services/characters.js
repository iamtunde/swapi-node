const {getCharacters} = require('../lib/swapi');
const _ = require('lodash');
const sumArrayElements = array => array.reduce(function (a, b) { return a + b }, 0);
const convertToFeet = 

//function converts cm values to ft,in value
function convertToFeet(cm) {
    const actualValue = ((cm * 0.393700) / 12);
    const feet = Math.floor(actualValue);
    const inches = Math.round((actualValue - feet) * 12);

    return feet + 'ft and ' + inches + ' inches';
}

function all(req) {
    return getCharacters().then(characters => {
        let response
        let heights = []
        
        if(req.query.sortBy) {
            response = _.orderBy(characters, req.query.sortBy, req.query.order)
        } else if(req.query.filterBy) {
            const params = {'gender': req.query.anchor}
            response = _.filter(characters, params)
        } else {
            response = characters
        }

        //extract the heights of the matching characters
        response.map(({height}) => { heights.push(parseInt(height)) })

        //converts the total height from CM to Ft & Inches
        const totalHeightInCM = sumArrayElements(heights)

        //construct meta_data object
        const meta_data = {
            total_characters: response.length,
            total_heights: {
                cm: totalHeightInCM + 'cm',
                ft: convertToFeet(totalHeightInCM)
            }
        }

        response.push(meta_data)
        return response
    })
}

module.exports = {all}