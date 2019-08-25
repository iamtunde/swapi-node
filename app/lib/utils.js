function getErrorCode(err) {
    const code = err.error && err.error.statusCode
    return code
}

module.exports = {
    getErrorCode
}