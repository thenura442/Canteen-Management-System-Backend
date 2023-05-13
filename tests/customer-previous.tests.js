// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const nock = require('nock');
// const axios = require('axios');
// const responseMockData = require('./mockJsonFiles/mock');
// const MockFunctions = require('./mockFunctions/customer.functions');

// chai.use(chaiHttp);
// const should = chai.should();
// const expect = chai.expect;

// const path = 'https://localhost:5500'
// const api = '/api/employee'

// describe('Employee Routes Tests', () => {

//     it("Checks if Employee data gets created and returns message", async () => {
//         nock(path)
//             .post(api+'/register')
//             .reply(200, {
//                 body: responseMockData.customer
//             });
//             const results = await MockFunctions.createCustomer({
//                 "first_name" : "Thenura",
//                 "last_name" : "Wijerathne",
//                 "nic" : "200308300020",
//                 "dob" : "03/23/2023",
//                 "email" : "thenura1154@gmail.com",
//                 "mobile_no" : "0783323261",
//                 "address" : "272/10c-1,Subhamawatha,Nugegoda",
//                 "access" : "open",
//                 "type" : "owner",
//                 "url" : "https://canteen-management-system-nsbm.s3.ap-south-1.amazonaws.com/profile_pic.png",
//                 "password" : "admin123"
//             });
//         expect(results.body.first_name).equal("Thenura") && expect(results.body.last_name).equal("Wijerathne");
//      });

//   });