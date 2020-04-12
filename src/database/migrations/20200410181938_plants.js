exports.up = function(knex) {
    return knex.schema.createTable('plants', function(table){
        table.increments('id').primary()
        table.string('name').notNullable();
        table.string('scientificName').notNullable();
        table.string('informations').notNullable();
        table.string('image').notNullable();

        table.integer('user_id').unsigned();

        table.foreign('user_id').references('users.id')
    })
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('plants');
  };