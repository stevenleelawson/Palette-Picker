const express = require('express');
//requiring express
const app = express();
//instantiating express and saving it to a variable called app
const bodyParser = require('body-parser');
//requiring bodyParser to be able to post the body of requests

const environment = process.env.NODE_ENV || 'development';
//defining our environment to be the specified node environment, defaulting to development
const configuration = require('./knexfile')[environment];
//defines which environment we are using for our knex file
const database = require('knex')(configuration);
//setting the database to be whichever knex config we are using

app.use(bodyParser.json());
//allows use of bodyParser, converted to json
app.use(express.static('public'));
//This is the server-side render of our static files; allows html/css to be seen
app.set('port', process.env.PORT || 3000);
//setting the port we will use to be dynamic, or else defaulting to 3000

app.get('/', (request, response) => {
  response.send('Palette Picker');
})
//setting our base route
app.post('/api/v1/projects', (request, response) => {
  //the defined route to projects with a request and response
  const project = request.body;
  //saving the body of the request into a variable
  database('projects').insert(project, 'id')
  //inserting the body of the project into the projects table in the db
  .then(project => {
    response.status(201).json({ id: project[0] })
    //if successful, this resolves to the response status sent back, and defines what is in the response, in this case, the id of the first item in the array
  })
  .catch(error => {
    response.status(500).json({ error })
    //error handling with the response as as status code and the error
  })
})
//creating a route to post new projects to
app.post('/api/v1/projects/:id/palettes', (request, response) => {
  //defined dynamic route to get all the palettes of a project by its id
  const palette = request.body;
  //saving the body of the request into a variable for later use
  database('palettes').insert({...palette, project_id: request.params.id}, 'id')
  //saving the spreaded values of a project and setting the project id to be that of the request params, returing id to specify which project
    .then(palette => {
      response.status(201).json({ id: palette[0] })
      //response sent if successful
    })
    .catch(error => {
      response.status(500).json({ error })
      //response sent if not successful
    })
});

app.get('/api/v1/projects', (request, response) => {
  //defining the route to get all the projects
  database('projects').select()
  //selecting the database with knex syntax
  .then(projects => response.status(200).json(projects))
  //defining the response if successful, and the data sent back as json
  .catch(error => response.status(500).json(error))
  //error handling
});

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  //the dynamic route to get all palettes associated with a project
  database('palettes').select().where('project_id', request.params.id)
  //selecting all from the palettes table where the project id matches the request params id
  .then(palettes => response.status(200).json(palettes))
  //the response if successful, with data in the form of json
  .catch(error => response.status(500).json(error))
  //error handling
});

app.listen(app.get('port'), () => {
  console.log('Palette Picker be a listenin');
});
//this defines the port we are listening on, and allows the app to listen for requests
module.exports = app;
//exporting the app for testing purposes 
