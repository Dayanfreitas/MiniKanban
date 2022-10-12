exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id:1, name: 'usuario', email: 'usuario@gmail.com', password: '$2b$12$xfaZUOef1thI..Q8cMpIVelquZWGND90ecFjmdNK5.kAfNxyM1zh.'},
      ]);
    });
};
