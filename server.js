const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Palette Picker');
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  database('projects').insert(project, 'id')
  .then(project => {
    response.status(201).json({ id: project[0] })
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const palette = request.body;
  debugger
  database('palettes').insert({...palette, project_id: request.params.id}, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
  .then(projects => response.status(200).json(projects))
  .catch(error => response.status(500).json(error))
});

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  database('palettes').select().where('project_id', request.params.id)
  .then(palettes => response.status(200).json(palettes))
  .catch(error => response.status(500).json(error))
});

app.listen(app.get('port'), () => {
  console.log('Palette Picker be a listenin');
});

module.exports = app;
