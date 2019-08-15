exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary()
        table.string('comment', 500)
        table.string('ip_address', 15)
        table.integer('movie_id')
        table.string('created_at', 50)
        table.string('updated_at', 50)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments')
};