const app = module.exports = require('express')();

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to swapi-wrapper'
    });
});

app.use('/movies', require('./movies'));
app.use('/characters', require('./characters'));
app.use('/comments', require('./comments'));

// Catch missing endpoint to display 404
app.all('*', (req, res) => {
    res.status(404).json({
        message: 'That endpoint does not exist',
    });
});