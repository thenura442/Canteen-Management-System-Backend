const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

describe('Common Routes Tests', () => {

    it('should return server status', done => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    
});