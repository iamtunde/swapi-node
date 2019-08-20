const database = require('../database/index')
const moment = require('moment-timezone')
const date = new Date()

function add(data) {
    if(process.env.APP_ENV !== 'production') {
        return database('comments').returning('*').insert(data).then(record => {
            return record
        })
    } else {
        const now = date.getTime()

        data.created_at = moment().tz(now.toString()).utc().format()
        data.updated_at = moment().tz(now.toString()).utc().format()

        return database('comments').insert(data).then(recordId => {
            return database.select().from('comments').where({id: recordId}).first().then(data => {
                return data
            })
        })
    }
}

function fetch(params) {
    return database.select().from('comments').where(params).orderBy('created_at', 'asc').then(data => {
        return data
    })
}

module.exports = {add, fetch}