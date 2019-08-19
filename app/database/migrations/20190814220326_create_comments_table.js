exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary()
        table.string('comment', 500)
        table.string('ip_address', 15)
        table.integer('movie_id')
        table.timestamps(false, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments')
};