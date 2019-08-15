const database = require('../database/index')
const moment = require('moment-timezone')

const date = new Date()
const now = date.getTime()

function add(data) {
    data.created_at = moment().tz(now.toString()).utc().format()
    data.updated_at = moment().tz(now.toString()).utc().format()

    return database('comments').insert(data).returning('*').then(record => {
        return record
    })
}

function fetch(params) {
    return database.select().from('comments').where(params).orderBy('created_at', 'asc').then(data => {
        return data
    })
}

module.exports = {add, fetch}