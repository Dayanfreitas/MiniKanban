
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('project').del()
    .then(function () {
      // Inserts seed entries
      return knex('project').insert([
        {id: 1, nome: 'Projeto 1', data_inicial: '01/01/2019', data_final: '31/01/2019', progresso: 50, atrasado: false},
        {id: 2, nome: 'Projeto 2', data_inicial: '01/02/2019', data_final: '28/02/2019', progresso: 0, atrasado: true}
      ]);
    });
};

