exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', table => {
      table.increments('id');
      table.string('title');
      table.string('body');
      table.string('dev_time');
      table.integer('author_id')
        .references('id')
        .inTable('users');
      table.timestamps(false, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('projects');
};