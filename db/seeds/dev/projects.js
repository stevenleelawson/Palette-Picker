
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          title: 'TableTop'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { name: 'frightened', project_id: project[0] },
            { name: 'harbour', project_id: project[0] }
          ])
        })
        .then(() => console.log('seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
