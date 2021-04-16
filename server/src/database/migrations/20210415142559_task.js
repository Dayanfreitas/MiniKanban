exports.up = function(knex) {
    return knex.schema.createTable('task', function(table) {
      table.increments('id');
      table.string('descricao').notNullable();
      table.string('data_inicio').notNullable();
      table.string('data_fim').notNullable();
      table.integer('id_projeto').unsigned();
      table.foreign('id_projeto').references("project.id");
      table.boolean('finalizada').defaultTo(false);
      table.string('status', 4).defaultTo('P');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('task');
  };