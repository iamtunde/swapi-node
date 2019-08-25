const database = require('../database/index')
const moment = require('moment-timezone')
const date = new Date()

function add(data) {
    const now = date.getTime()

    data.created_at = moment().tz(now.toString()).utc().format()
    data.updated_at = moment().tz(now.toString()).utc().format()

    return database('comments').returning('*').insert(data).then(recordId => {
        return database.select().from('comments').where({
            id: recordId }).first()
        })
}

function fetch(params) {
    return database.select().from('comments').where(params).orderBy('created_at', 'asc').then(data => {
        return data
    })
}

module.exports = {add, fetch}