
exports.up = function(knex) {
  return knex.schema.createTable('plantTypes', function(table){
      table.increments('id').primary()
      table.boolean('tree')
      table.boolean('cactus')
      table.boolean('flower')
      table.boolean('leaf')

      table.integer('plant_id').unsigned()
      table.foreign('plant_id').references('plants.id')
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('plantTypes');
};