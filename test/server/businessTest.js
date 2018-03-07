import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server/app';
import { dummyBusiness } from './../helpers/dummy';

const { assert } = chai;

chai.should();
chai.use(chaiHttp);

describe('Business controller tests', () => {
  describe('Given that a user sends a POST request to /api/v1/businesses/', () => {
    it('should return 201 status code and create new business', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .type('form')
        .send(dummyBusiness.validBusiness1)
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

    it('should return 409 status code when there is a duplicate business name', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .type('form')
        .send(dummyBusiness.invalidBusiness1)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          assert.strictEqual(
            res.body.message,
            `${dummyBusiness.invalidBusiness1.businessName} already exists as a business name`,
            'duplicate business name'
          );
          done();
        });
    });

    it('should return 406 status code when neccessary inputs are not passed in', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .type('form')
        .send(dummyBusiness.invalidBusiness2)
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

    it('should return 201 status code when unneccessary inputs are not passed in', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .type('form')
        .send(dummyBusiness.validBusiness2)
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
            '',
            'business should still be created'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a PUT request to /api/v1/businesses/:businessId', () => {
    it('should return 200 status code and update business with the businessId', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/1')
        .type('form')
        .send(dummyBusiness.validBusinessUpdate1)
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

    it('should return 404 status code when businessId is not in the database', (done) => {
      chai.request(app)
        .put('/api/v1/businesses/5')
        .type('form')
        .send(dummyBusiness.validBusinessUpdate1)
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
        .type('form')
        .send(dummyBusiness.invalidBusiness2)
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

    it('should return 404 status code when businessId is not in the database', (done) => {
      chai.request(app)
        .delete('/api/v1/businesses/5')
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
});
