exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('records', function(table) {
      table.increments('id').primary();
      table.string('description').notNullable();
      table.integer('vehicle_id').unsigned().notNullable().references('id').inTable('vehicles');
    }),
  ]);
};
exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('records'),
  ]);
};
