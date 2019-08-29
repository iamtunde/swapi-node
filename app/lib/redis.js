const redis = require('redis')
const client = redis.createClient(6379, '123.45.678.901')

//print out connection error to the console
client.on('error', (err) => {
    console.log('Cache connection error: ' + err)
})

//print connection successful error
client.on('connect', () => {
    console.log('Cache connection established')
})

const store = (key, value) => {
    client.hmset(key, value)

    return true;
}

const get = (key) => {
    return client.get(key)
}

module.exports = {
    store,
    get
}