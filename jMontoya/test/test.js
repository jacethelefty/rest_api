const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/politicians_app_test';
// const server = require(__dirname + '/../server.js');
// const Politician = require(__dirname + '/models/politicianModel.js');

describe('the politicians api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should create a politician with POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/demPoliticians')
      .send({fullName: 'Joe Low'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Joe Low');
        expect(res.body).to.have.property('_id');
        done();
      });   //end chai.request for POST
  });       //end it should POST

  it('should be able to GET all politicians from db', (done) => {
    chai.request('localhost:3000')
      .get('/api/demPoliticians')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });   //end chai.request for GET
  });       //end it should GET

  it('should be able to GET all politicians from db by _id', (done) => {
    chai.request('localhost:3000')
      .get('/api/demPoliticians/:id')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.eql(true);
        done();
      });   //end chai.request for GET
  });       //end it should GET by _id

  describe('rest requests that require a politician already be in the db', () => {
    beforeEach((done) => {
      Politician.create({fullName: 'Joe Blow'}, (err, data) => {
        this.testPolitician = data;
        done();
      });
    });

  it('should be able to UPDATE a politician', (done) => {
    chai.request('localhost:3000')
      .put('/api/demPoliticians/' + this.testPolitician._id)
      .send({fullName: 'new politician name'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('you have successfully updated the file');
        done();
      });   //end chai.request for GET
  });       //end it should UODATE

  it('should be able to DELETE a politician', (done) => {
    chai.request('localhost:3000')
      .delete('/api/demPoliticians/:id' + this.testPolitician._id)
      .send({fullName: 'new politician name'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.msg).to.eql('you have successfully deleted the file');
        done();
      });   //end chai.request for GET
  });       //end it should UODATE

  });       //end nested describe

});         //end describe