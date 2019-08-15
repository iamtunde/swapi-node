const database = require('../database/index')
const moment = require('moment-timezone')

const date = new Date()
const now = date.getTime()

function add(data) {
    data.created_at = moment().tz(now.toString()).utc().format()
    data.updated_at = moment().tz(now.toString()).utc().format()

    return database.insert(data).into('comments').then(recordId => {
        return database.select('*').from('comments').where({id: recordId})
    })
}

function fetch(params) {
    return database.select().from('comments').where(params).orderBy('created_at', 'asc').then(data => {
        return data
    })
}

module.exports = {add, fetch}