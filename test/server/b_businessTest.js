import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server/app';
import { db } from './../../server/src/models';
import { userData, businessData } from './../helpers/dummy';

const { Business } = db;
const { assert, should } = chai;
let authtoken1;
let authtoken2;

should();
chai.use(chaiHttp);

describe('Business controller tests', () => {
  before((done) => {
    Business.sync({ force: true })
      .then(() => done())
      .catch(err => done(err));
  });

  describe('Given that a user sends a POST request to /api/v1/businesses/', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user1.password
        })
        .end((err, res) => {
          authtoken1 = res.body.token;
          done();
        });
    });

    it('should return 201 status code and create new business', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.business.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business successfully created'
          );
          done();
        });
    });

    it('should return 201 status code when unneccessary inputs are not passed in', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business2)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.business.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business successfully created'
          );
          assert.strictEqual(
            res.body.business.workHours,
            null,
            'business should still be created'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not valid', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .set('authorization', 'authtokenIsAnInvalidString')
        .type('form')
        .send(businessData.business2)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Invalid token'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not passed in', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .type('form')
        .send(businessData.business2)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Please login'
          );
          done();
        });
    });

    it('should return 406 status code when neccessary inputs are not passed in', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business4)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          assert.isUndefined(
            res.body.message,
            'message is undefined'
          );
          done();
        });
    });

    it('should return 409 status code when there is a duplicate business name', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business3)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            'Business name already exists',
            'duplicate business name'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a PUT request to /api/v1/businesses/:businessId', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user2.email,
          password: userData.user2.password
        })
        .end((err, res) => {
          authtoken2 = res.body.token;
          done();
        });
    });

    it('should return 200 status code and update business with the businessId', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/1')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business5)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.business.should.be.a('object');
          assert.strictEqual(
            res.body.business.address,
            '30, Lamba road',
            'Business address updated'
          );
          assert.isString(
            res.body.message,
            'Business successfully updated'
          );
          done();
        });
    });

    it('should return 401 status code when user is not the owner of the business', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/1')
        .set('authorization', authtoken2)
        .type('form')
        .send(businessData.business1)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Unauthorized access to content'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not passed in', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/1')
        .type('form')
        .send(businessData.business1)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Please login'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not in the database', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/5')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business not found'
          );
          done();
        });
    });

    it('should return 406 status code when neccessary inputs are not passed in', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/2')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business4)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.error.should.be.a('array');
          assert.isUndefined(
            res.body.message,
            'message is undefined'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a DELETE request to /api/v1/businesses/:businessId', () => {
    it('should return 200 status code and delete business with the businessId', (done) => {
      chai.request(app)
        .delete('/api/v1/businesses/1')
        .set('authorization', authtoken1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.business.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business was successfully deleted'
          );
          done();
        });
    });

    it('should return 401 status code when user is not the owner of the business', (done) => {
      chai.request(app)
        .delete('/api/v1/businesses/2')
        .set('authorization', authtoken2)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Unauthorized access to content'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not valid', (done) => {
      chai.request(app)
        .delete('/api/v1/businesses/2')
        .set('authorization', 'authtokenIsAnInvalidString')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Invalid token'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not passed in', (done) => {
      chai.request(app)
        .delete('/api/v1/businesses/2')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Please login'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not in the database', (done) => {
      chai.request(app)
        .delete('/api/v1/businesses/5')
        .set('authorization', authtoken1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business not found'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a GET request to /api/v1/businesses/:businessId', () => {
    it('should return 200 status code and retrieve business with the businessId', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.business.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business was successfully found'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not in the database', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/1')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business not found'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a GET request to /api/v1/businesses/', () => {
    it('should return 200 status code and retrieve all business in the database', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.businesses.should.be.a('array');
          assert.isString(
            res.body.message,
            'All Businesses'
          );
          done();
        });
    });

    it('should return 200 status code and retrieve all businesses with the given location', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/?location=yaba')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.businesses.should.be.a('array');
          assert.isString(
            res.body.message,
            'Businesses found'
          );
          done();
        });
    });

    it('should return 200 status code and no list if the location is not availabe', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/?location=abia')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          assert.isUndefined(
            res.body.businesses,
            'No business with abia as the location'
          );
          assert.isString(
            res.body.message,
            'There are no businesses matching your search'
          );
          done();
        });
    });

    it('should return 200 status code and retrieve all businesses within the given category', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/?category=bar')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.businesses.should.be.a('array');
          assert.isString(
            res.body.message,
            'Businesses found'
          );
          done();
        });
    });

    it('should return 200 status code and retrieve all businesses within the given category and location', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/?category=bar&location=enugu')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.businesses.should.be.a('array');
          assert.isString(
            res.body.message,
            'Businesses found'
          );
          done();
        });
    });
  });
});
