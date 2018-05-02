const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('Palette Picker');
})

app.post('/api/v1/projects', (request, response) => {

})

app.get('/api/v1/projects', (request, response) => {
  
})

app.listen(app.get('port'), () => {
  console.log('Palette Picker be a listenin');
});
