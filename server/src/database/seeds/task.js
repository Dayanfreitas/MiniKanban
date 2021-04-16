
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('task').del()
    .then(function () {
      // Inserts seed entries
      return knex('task').insert([
        {id: 1, descricao: 'Atividade 1', data_inicio: '06/01/2019', data_fim: '15/01/2019', id_projeto: 1, finalizada: true, status: 'CON'},
        {id: 2, descricao: 'Atividade 2', data_inicio: '16/01/2019	', data_fim: '31/01/2019', id_projeto: 1, finalizada: false, status: 'P'},
        
        {id: 3, descricao: 'Atividade 3', data_inicio: '01/02/2019' , data_fim: '10/02/2019', id_projeto: 2, finalizada: false, status: 'P'},
        {id: 4, descricao: 'Atividade 4', data_inicio: '11/02/2019' , data_fim: '20/02/2019', id_projeto: 2, finalizada: false, status: 'P' },
        {id: 5, descricao: 'Atividade 5', data_inicio: '21/02/2019' , data_fim: '02/03/2019', id_projeto: 2, finalizada: false, status: 'P'},

      ]);
    });
};
