// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from './../app';
// import { db } from './../src/models';
// import { userData, businessData } from './../mockData/serveMockData';

// const { Business } = db;
// const { assert, should } = chai;
// let authtoken1;
// let authtoken2;
// let businessId1;
// let businessId2;

// should();
// chai.use(chaiHttp);

// describe('Given that a user sends a ', () => {
//   before((done) => {
//     Business.sync({ force: true })
//       .then(() => done());
//   });

//   describe('POST request to /api/v1/businesses/', () => {
//     before((done) => {
//       chai.request(app)
//         .post('/api/v1/auth/login')
//         .type('form')
//         .send({
//           email: userData.user1.email,
//           password: userData.user1.password
//         })
//         .end((err, res) => {
//           authtoken1 = res.body.token;
//           done();
//         });
//     });

//     it('should return 201 status code and create new business', (done) => {
//       chai.request(app)
//         .post('/api/v1/businesses/')
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business1)
//         .end((err, res) => {
//           res.should.have.status(201);
//           assert.isNotNull(
//             res.body.business,
//             'Business created'
//           );
//           res.body.business.should.be.a('object');
//           assert.equal(
//             res.body.business.businessName,
//             businessData.business1.businessName
//           );
//           businessId1 = res.body.business.id;
//           done();
//         });
//     });

//     it('should return 201 status code when unneccessary inputs are not passed in', (done) => {
//       chai.request(app)
//         .post('/api/v1/businesses/')
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business2)
//         .end((err, res) => {
//           res.should.have.status(201);
//           assert.isNotNull(
//             res.body.business,
//             'Business created'
//           );
//           res.body.business.should.be.a('object');
//           assert.equal(
//             res.body.business.businessName,
//             businessData.business2.businessName
//           );
//           assert.strictEqual(
//             res.body.business.workHours,
//             null,
//             'business should still be created'
//           );
//           businessId2 = res.body.business.id;
//           done();
//         });
//     });

//     it('should return 400 status code when neccessary inputs are not passed in', (done) => {
//       chai.request(app)
//         .post('/api/v1/businesses/')
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business4)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.message.should.be.a('array');
//           done();
//         });
//     });

//     it('should return 401 status code when a token is not valid', (done) => {
//       chai.request(app)
//         .post('/api/v1/businesses/')
//         .set('authorization', 'authtokenIsAnInvalidString')
//         .type('form')
//         .send(businessData.business2)
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Invalid token'
//           );
//           done();
//         });
//     });

//     it('should return 401 status code when a token is not passed in', (done) => {
//       chai.request(app)
//         .post('/api/v1/businesses/')
//         .type('form')
//         .send(businessData.business2)
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Token absent'
//           );
//           done();
//         });
//     });

//     it('should return 409 status code when there is a duplicate business name', (done) => {
//       chai.request(app)
//         .post('/api/v1/businesses/')
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business3)
//         .end((err, res) => {
//           res.should.have.status(409);
//           assert.strictEqual(
//             res.body.message,
//             'Business name exists',
//             'duplicate business name'
//           );
//           done();
//         });
//     });
//   });

//   describe('PUT request to /api/v1/businesses/:businessId', () => {
//     before((done) => {
//       chai.request(app)
//         .post('/api/v1/auth/login')
//         .type('form')
//         .send({
//           email: userData.user2.email,
//           password: userData.user2.password
//         })
//         .end((err, res) => {
//           authtoken2 = res.body.token;
//           done();
//         });
//     });

//     it('should return 200 status code and update business with the businessId', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/${businessId1}`)
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business5)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.business.should.be.a('object');
//           assert.strictEqual(
//             res.body.business.address,
//             '30, Lamba road',
//             'Business address updated'
//           );
//           assert.equal(
//             res.body.message,
//             'Update successful'
//           );
//           done();
//         });
//     });

//     it('should return 400 status code when neccessary inputs are not passed in', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/${businessId1}`)
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business4)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.message.should.be.a('array');
//           done();
//         });
//     });

//     it('should return 401 status code when user is not the owner of the business', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/${businessId1}`)
//         .set('authorization', authtoken2)
//         .type('form')
//         .send(businessData.business1)
//         .end((err, res) => {
//           res.should.have.status(403);
//           assert.equal(
//             res.body.message,
//             'Access to content denied'
//           );
//           done();
//         });
//     });

//     it('should return 401 status code when a token is not passed in', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/${businessId1}`)
//         .type('form')
//         .send(businessData.business1)
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Token absent'
//           );
//           done();
//         });
//     });

//     it('should return 404 status code when businessId is not a uuid', (done) => {
//       chai.request(app)
//         .put('/api/v1/businesses/anyInvalidBusinessIdString')
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business1)
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.equal(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return 404 status code when businessId is not valid', (done) => {
//       chai.request(app)
//         .put('/api/v1/businesses/756581de-2e7a-11e8-b467-0ed5f89f718b')
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business1)
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.equal(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return 409 status code when business name is changed to an existing business', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/${businessId1}`)
//         .set('authorization', authtoken1)
//         .type('form')
//         .send(businessData.business2)
//         .end((err, res) => {
//           res.should.have.status(409);
//           assert.strictEqual(
//             res.body.message,
//             'Business name exists',
//             'duplicate business name'
//           );
//           done();
//         });
//     });
//   });

//   describe('DELETE request to /api/v1/businesses/:businessId', () => {
//     it('should return 200 status code and delete business with the businessId', (done) => {
//       chai.request(app)
//         .delete(`/api/v1/businesses/${businessId1}`)
//         .set('authorization', authtoken1)
//         .end((err, res) => {
//           res.should.have.status(200);
//           assert.equal(
//             res.body.message,
//             'Delete successful'
//           );
//           done();
//         });
//     });

//     it('should return 401 status code when user is not the owner of the business', (done) => {
//       chai.request(app)
//         .delete(`/api/v1/businesses/${businessId2}`)
//         .set('authorization', authtoken2)
//         .end((err, res) => {
//           res.should.have.status(403);
//           assert.equal(
//             res.body.message,
//             'Access to content denied'
//           );
//           done();
//         });
//     });

//     it('should return 401 status code when a token is not valid', (done) => {
//       chai.request(app)
//         .delete(`/api/v1/businesses/${businessId2}`)
//         .set('authorization', 'authtokenIsAnInvalidString')
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Invalid token'
//           );
//           done();
//         });
//     });

//     it('should return 401 status code when a token is not passed in', (done) => {
//       chai.request(app)
//         .delete(`/api/v1/businesses/${businessId2}`)
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Token absent'
//           );
//           done();
//         });
//     });

//     it('should return 404 status code when businessId is not a uuid', (done) => {
//       chai.request(app)
//         .delete('/api/v1/businesses/anyInvalidBusinessIdString')
//         .set('authorization', authtoken1)
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.isString(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return 404 status code when businessId is not valid', (done) => {
//       chai.request(app)
//         .delete('/api/v1/businesses/756581de-2e7a-11e8-b467-0ed5f89f718b')
//         .set('authorization', authtoken1)
//         .type('form')
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.isString(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });
//   });

//   describe('GET request to /api/v1/businesses/:businessId', () => {
//     it('should return 200 status code and retrieve business with the businessId', (done) => {
//       chai.request(app)
//         .get(`/api/v1/businesses/${businessId2}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           assert.isNotNull(
//             res.body.business,
//             'Business found'
//           );
//           res.body.business.should.be.a('object');
//           assert.equal(
//             res.body.business.businessName,
//             'Coffe Shop'
//           );
//           done();
//         });
//     });

//     it('should return 404 status code when businessId is not a uuid', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/anyInvalidBusinessIdString')
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.equal(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return 404 status code when businessId is not in the database', (done) => {
//       chai.request(app)
//         .get(`/api/v1/businesses/${businessId1}`) // deleted in delete route test
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.equal(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });
//   });

//   describe('GET request to /api/v1/businesses/', () => {
//     it('should return 200 status code and retrieve all business in the database', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.businesses.should.be.a('array');
//           done();
//         });
//     });

//     it('should return 200 status code and retrieve all businesses with the given location', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/?location=yaba')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.businesses.should.be.a('array');
//           done();
//         });
//     });

//     it('should return 200 status code and no list if the location is not availabe', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/?location=abia')
//         .end((err, res) => {
//           res.should.have.status(200);
//           assert.equal(
//             res.body.message,
//             'No businesses found'
//           );
//           done();
//         });
//     });

//     it('should return 200 status code and retrieve all businesses within the given category', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/?category=bar')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.businesses.should.be.a('array');
//           done();
//         });
//     });

//     it('should return 200 status code and retrieve all businesses within the given category and location', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/?category=bar&location=enugu')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.businesses.should.be.a('array');
//           done();
//         });
//     });
//   });

//   describe('PUT request to /api/v1/businesses/change-ownership/:businessId/', () => {
//     it('should return a status 200 and change the business ownership to a new user with the email passed in', (done) => {
//       // user1 transferring business2 to user2
//       chai.request(app)
//         .put(`/api/v1/businesses/change-ownership/${businessId2}`)
//         .set('authorization', authtoken1)
//         .send({ email: userData.user2.email })
//         .end((err, res) => {
//           res.should.have.status(200);
//           assert.equal(
//             res.body.message,
//             'Business ownership transferred to rick.orga@gmail.com',
//             'Business ownership transfer complete'
//           );
//           done();
//         });
//     });

//     it('should return a status 401 when token is not provided', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/change-ownership/${businessId2}`)
//         .send({ email: userData.user2.email })
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Token absent'
//           );
//           done();
//         });
//     });

//     it('should return a status 404 when user is not the owner of the business', (done) => {
//       // Ownership has been transferred to user2
//       chai.request(app)
//         .put(`/api/v1/businesses/change-ownership/${businessId2}`)
//         .set('authorization', authtoken1)
//         .send({ email: userData.user6.email })
//         .end((err, res) => {
//           res.should.have.status(403);
//           assert.equal(
//             res.body.message,
//             'Access to content denied',
//             'User does not own the business anymore'
//           );
//           done();
//         });
//     });

//     it('should return a status 404 when business is not found', (done) => {
//       // user1 transferring business1 to user6
//       chai.request(app)
//         .put(`/api/v1/businesses/change-ownership/${businessId1}`) // busines deleted previously
//         .set('authorization', authtoken1)
//         .send({ email: userData.user6.email })
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.equal(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return a status 404 status code when businessId is not in the database', (done) => {
//       chai.request(app)
//         .put('/api/v1/businesses/change-ownership/756581de-2e7a-11e8-b467-0ed5f89f718b')
//         .set('authorization', authtoken2)
//         .type('form')
//         .send({ email: userData.user1.email })
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.isString(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return a status 404 status code when businessId is not a uuid', (done) => {
//       chai.request(app)
//         .put('/api/v1/businesses/change-ownership/anyInvalidBusinessIdString')
//         .set('authorization', authtoken2)
//         .type('form')
//         .send({ email: userData.user1.email })
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.isString(
//             res.body.message,
//             'Business not found'
//           );
//           done();
//         });
//     });

//     it('should return a status 404 when the recipient\'s email is not in the database', (done) => {
//       chai.request(app)
//         .put(`/api/v1/businesses/change-ownership/${businessId2}`)
//         .set('authorization', authtoken2)
//         .send({ email: userData.user3.email })
//         .end((err, res) => {
//           res.should.have.status(404);
//           assert.equal(
//             res.body.message,
//             'User not found',
//             'Email is not in the database'
//           );
//           done();
//         });
//     });
//   });

//   describe('GET request to /api/v1/businesses/user', () => {
//     it('should return a status of 200 when user is logged in', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/user')
//         .set('authorization', authtoken1)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.businesses.should.be.a('array');
//           done();
//         });
//     });

//     it('should return a status of 401 when user is not logged in', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/user')
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Token absent'
//           );
//           done();
//         });
//     });

//     it('should return a status of 401 when an invalid token is passed in', (done) => {
//       chai.request(app)
//         .get('/api/v1/businesses/user')
//         .set('authorization', 'anyInvalidTokenString')
//         .end((err, res) => {
//           res.should.have.status(401);
//           assert.equal(
//             res.body.message,
//             'Invalid token'
//           );
//           done();
//         });
//     });
//   });
// });
