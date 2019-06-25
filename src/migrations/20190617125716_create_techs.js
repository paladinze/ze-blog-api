exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('techs', table => {
      table.increments('id');
      table.string('name');
      table.string('icon');
      table.string('use');
      table.timestamps(false, true);
    })
  ])
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('techs');
};