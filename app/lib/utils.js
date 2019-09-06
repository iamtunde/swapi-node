function getErrorCode(err) {
    const code = err.error && err.error.statusCode
    return code
}

const errorHandler = (message = 'Swapi error occurred') => err => {
    // console.log(err)
    throw {
        message,
    }
}

module.exports = {
    getErrorCode,
    errorHandler
}