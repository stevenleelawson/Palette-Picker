
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
            { name: 'frightened',
              project_id: project[0],
              color_array:["rgb(0, 0, 255)", "rgb(255, 0, 0)", "rgb(255, 127, 80)", "rgb(0, 128, 0)", "rgb(255, 192, 203)"],
              color1: 'blue',
              color2: 'purple',
              color3: 'pink',
              color4: 'black',
              color5: 'grey'
             },
            { name: 'saxophone',
              project_id: project[0],
              color_array:["rgb(0, 50, 255)", "rgb(255, 0, 0)", "rgb(255, 127, 80)", "rgb(0, 128, 0)", "rgb(255, 192, 203)"],
              color1: 'yellow',
              color2: 'purple',
              color3: 'pink',
              color4: 'black',
              color5: 'grey'
            },
          ])
        })
        .then(() => console.log('seeding complete'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
