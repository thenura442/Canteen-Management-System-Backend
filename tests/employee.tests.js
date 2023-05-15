const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('./mockJsonFiles/employee.mock');

chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

const api = '/api/employee'

//Testing Customer Routes with Error Messages and Success Messages

describe('Employee Routes Tests Suite', () => {    
    
    it('should return customer email needs to be valid', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockFalseObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal('"email" must be a valid email',res.body.Error,err)
            done();
        });
    });

    it('should return employee created message as success', done => {
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


    it('should return that email already exists', done => {
        chai
          .request(app)
          .post(api+'/register')
          .send(mock.mockObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Email Already Exists!",res.body.Error,err)
            done();
        });
    });

    it('should return employee login as success', done => {
        chai
          .request(app)
          .post('/api/auth/login/web')
          .send({ email : mock.mockLoginObject.email , password : mock.mockLoginObject.password , type : mock.mockLoginObject.type})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("tester122@gmail.com",res.body.email,err)
            done();
        });
    });


    it('should return employee login as Incorrect Username or Password', done => {
        chai
          .request(app)
          .post('/api/auth/login/web')
          .send({ email : mock.mockFalseLoginObject.email , password : mock.mockFalseLoginObject.password , type : mock.mockFalseLoginObject.type})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Email or Password is Incorrect",res.body.Error,err)
            done();
        });
    });



    it('should return the customer information', done => {
        chai
          .request(app)
          .post(api+'/get/id')
          .send({email : "tester122@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal(mock.findObject.first_name,res.body.first_name,err)
            chai.assert.equal(mock.findObject.last_name,res.body.last_name,err)
            chai.assert.equal(mock.findObject.nic,res.body.nic,err)
            chai.assert.equal(mock.findObject.dob,res.body.dob,err)
            chai.assert.equal(mock.findObject.email,res.body.email,err)
            chai.assert.equal(mock.findObject.mobile_no,res.body.mobile_no,err)
            chai.assert.equal(mock.findObject.address,res.body.address,err)
            chai.assert.equal(mock.findObject.access,res.body.access,err)
            chai.assert.equal(mock.findObject.type,res.body.type,err)
            chai.assert.equal(mock.findObject.vendor,res.body.vendor,err)
            chai.assert.equal(mock.findObject.url,res.body.url,err)
            done();
        });
    });


    it('should update customer details and return success', done => {
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


    it('should return that email needs to be valid', done => {
        chai
          .request(app)
          .post(api+'/update/id')
          .send(mock.updateFalseObject)
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal('"mobile_no" length must be at least 10 characters long',res.body.Error,err)
            done();
        });
    });


    it('should update customer Password and return success', done => {
        chai
          .request(app)
          .post(api+'/update/pass')
          .send({ email : "tester122@gmail.com" , old_password : "tester123" , new_password : "tester1234" , retype_new_password : "tester1234"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });


    it('should return customer Old Password is not valid', done => {
        chai
          .request(app)
          .post(api+'/update/pass')
          .send({ email : "tester122@gmail.com" , old_password : "tester12345" , new_password : "tester1234" , retype_new_password : "tester1234"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("Please Enter the Valid Old Password",res.body.Error,err)
            done();
        });
    });


    it('should delete customer record that was created', done => {
        chai
          .request(app)
          .post(api+'/delete/id')
          .send({email : "tester122@gmail.com"})
          .end((err, res) => {
            res.should.have.status(200);
            chai.assert.equal("success",res.body.message,err)
            done();
        });
    });
});