const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/vendor.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/vendor'

//Testing Customer Routes with Error Messages and Success Messages

describe('Vendor Routes Tests Suite', () => {
    
    it('should return Vendor description needs to be atleast 6 letters long', done => {
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

    it('should return vendor created message as success', done => {
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


    it('should return the vendor information', done => {
        chai
          .request(app)
          .post(api+'/get/id')
          .send({email : "teststore@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.vendor_name,res.body.vendor_name,err)
            chai.assert.equal(mock.findObject.email,res.body.email,err)
            chai.assert.equal(mock.findObject.description,res.body.description,err)
            chai.assert.equal(mock.findObject.url,res.body.url,err)
            chai.assert.equal(mock.findObject.mobile_no,res.body.mobile_no,err)
            chai.assert.equal(mock.findObject.access,res.body.access,err)
            done();
        });
    });


    it('should delete vendor record that was created', done => {
        chai
          .request(app)
          .post(api+'/delete/id')
          .send({email : "teststore@gmail.com" , url : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/test_store.png"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});