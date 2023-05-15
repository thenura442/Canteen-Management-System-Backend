const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/cart.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/cart'

//Testing Customer Routes with Error Messages and Success Messages

describe('Cart Routes Tests Suite', () => {

    it('should return cart created message as success', done => {
        chai
          .request(app)
          .post(api+'/create')
          .send(mock.mockObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });

    it('should return the Cart information of the Customer', done => {
        chai
          .request(app)
          .post(api+'/get')
          .send({customer_email : "tester122@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.customer_email,res.body.customer_email,err)
            chai.assert.equal(mock.findObject.store_email,res.body.store_email,err)
            chai.assert.equal(mock.findObject.sub_total,res.body.sub_total,err)
            done();
        });
    });


    it('should update cart details and return updated cart details', done => {
        chai
          .request(app)
          .post(api+'/update')
          .send(mock.updateObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.updateObject.customer_email,res.body.customer_email,err)
            chai.assert.equal(mock.updateObject.store_email,res.body.store_email,err)
            chai.assert.equal(mock.updateObject.sub_total,res.body.sub_total,err)
            done();
        });
    });

    it('should delete cart item details and return success', done => {
        chai
          .request(app)
          .post(api+'/delete/item')
          .send({ id : "I-AA81881" , customer_email : "tester122@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should delete cart record that was created', done => {
        chai
          .request(app)
          .post(api+'/delete')
          .send({customer_email : "tester122@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});