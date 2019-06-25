exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema
    .createTable('users', table => {
      table.increments('id');
      table.string('username');
      table.string('email');
      table.string('password');
      table.timestamps(false, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('users');
};