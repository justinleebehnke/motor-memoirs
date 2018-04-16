exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('vehicles', function(table) {
      table.increments('id').primary();
      table.string('vehicle_name');
      table.integer('year');
      table.string('make');
      table.string('model');
      table.integer('odometer');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('vehicles'),
  ]);
};
