exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id:1, name: 'Dayan Freitas', email: 'user@gmail.com', password: '$2a$12$IZlTyHRY5CxGreNQdcYwxuCalEkgyB5.Y1PNcZpXAoFz0M/wSxzHW'}
      ]);
    });
};
