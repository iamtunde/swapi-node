const database = require('../database/index')

function add(data) {
    return database('comments').returning('*').insert(data).then(record => {
        return record
    })
}

function fetch(params) {
    return database.select().from('comments').where(params).orderBy('created_at', 'asc').then(data => {
        return data
    })
}

module.exports = {add, fetch}