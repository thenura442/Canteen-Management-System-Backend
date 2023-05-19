const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/item.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/item'

//Testing Customer Routes with Error Messages and Success Messages

describe('Item Routes Tests Suite', () => {
    
    it('should return item description needs to be atleast 6 letters long', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockFalseObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal('"description" length must be at least 6 characters long',res.body.Error,err)
            done();
        });
    });

    it('should return item created message as success and its ID', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should return the item information', done => {
        chai
          .request(app)
          .post(api+'/get/id')
          .send({id : "I-121212_Test"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.id,res.body.id,err)
            chai.assert.equal(mock.findObject.item_name,res.body.item_name,err)
            chai.assert.equal(mock.findObject.vendor,res.body.vendor,err)
            chai.assert.equal(mock.findObject.description,res.body.description,err)
            chai.assert.equal(mock.findObject.url,res.body.url,err)
            chai.assert.equal(mock.findObject.type,res.body.type,err)
            chai.assert.equal(mock.findObject.meal_type,res.body.meal_type,err)
            chai.assert.equal(mock.findObject.price,res.body.price,err)
            chai.assert.equal(mock.findObject.availability,res.body.availability,err)
            done();
        });
    });



    it('should return the search List including only the test item', done => {
        chai
          .request(app)
          .post(api+'/get/search/list')
          .send({search : "Test Item Name"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(1,res.body.length ,err)
            done();
        });
    });


    it('should update item details and return success', done => {
        chai
          .request(app)
          .post(api+'/update/id')
          .send(mock.updateObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should delete Item record that was created', done => {
        chai
          .request(app)
          .post(api+'/delete/id')
          .send({id : "I-121212_Test"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});