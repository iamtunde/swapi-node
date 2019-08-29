function getErrorCode(err) {
    const code = err.error && err.error.statusCode
    return code
}

const errorHandler = (message = 'Swapi error occurred') => err => {
    console.log(err)
    throw {
        message,
        error: {
            message: err.message,
            statusCode: err.response.status //get the http response code
        },
        data: []
    }
}

module.exports = {
    getErrorCode,
    errorHandler
}