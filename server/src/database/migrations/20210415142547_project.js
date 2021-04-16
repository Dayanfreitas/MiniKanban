exports.up = function(knex) {
    return knex.schema.createTable('project', function(table) {
      table.increments('id');
      table.string('nome').notNullable();
      table.string('data_inicial').notNullable();
      table.string('data_final').notNullable();
      table.integer('progresso').defaultTo(0).notNullable();
      table.boolean('atrasado').defaultTo(false);
      table.string('status', 1).defaultTo('A');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('project');
  };