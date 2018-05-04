const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('Testing endpoints', () => {
  it('GET all projects', (done) => {
    chai.request(server)
    .get('/api/v1/projects')
    .end((err, response) => {
      response.should.be.json;
      response.should.have.status(200);
      response.body.should.be.an('array');
      response.body.length.should.equal(1)
      done();
    })
  })
})
