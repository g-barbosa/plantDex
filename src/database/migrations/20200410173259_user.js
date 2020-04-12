
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
      table.increments('id').primary()
      table.string('login').notNullable().unique();
      table.string('password').notNullable();
  })
};

exports.down = function(knex) {
  knex.schema.dropTable('users');
};
