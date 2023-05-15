const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/order.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/order'

//Testing Customer Routes with Error Messages and Success Messages

describe('Order Routes Tests Suite', () => {

    it('should return Order created message as success', done => {
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

    it('should return the Order information', done => {
        chai
          .request(app)
          .post(api+'/get/id')
          .send({id : "Test_O-23443933"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.customer_email,res.body.customer_email,err)
            chai.assert.equal(mock.findObject.store_email,res.body.store_email,err)
            chai.assert.equal(mock.findObject.total,res.body.total,err)
            done();
        });
    });


    it('should return all the Orders of the Test Store', done => {
        chai
          .request(app)
          .post(api+'/get')
          .send({store_email : "teststore@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(1,res.body.length,err)
            done();
        });
    });



    it('should return all the Orders of the Customer', done => {
        chai
          .request(app)
          .post(api+'/get/user/orders')
          .send({email : "tester122@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(1,res.body.length,err)
            done();
        });
    });


    it('should update order status and return success message', done => {
        chai
          .request(app)
          .post(api+'/update/status')
          .send({id : "Test_O-23443933" , status : "in progress"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should update order details and return success message', done => {
        chai
          .request(app)
          .post(api+'/update/status')
          .send(mock.updateObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should delete cart record that was created', done => {
        chai
          .request(app)
          .post(api+'/delete/id')
          .send({id : "Test_O-23443933"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});