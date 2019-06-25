exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([{
          name: 'Arrested Development',
          year: '1992',
          director: 'Spielburg'
        },
        {
          name: 'Freaks and Geeks',
          year: '1992',
          director: 'Spielburg'
        },
        {
          name: 'Seinfeld',
          year: '1992',
          director: 'Spielburg'
        }
      ]);
    });
};