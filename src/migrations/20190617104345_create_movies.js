exports.up = function (knex, Promise) {

  return Promise.all([
    knex.schema
    .createTable('movies', table => {
      table.increments('id');
      table.string('name');
      table.string('year');
      table.string('director');
      table.timestamps(false, true);
    })
  ])
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('movies')
};