import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';
import { db } from './../src/models';
import { userData, businessData, reviewData } from './../mockData/serveMockData';

const { Review } = db;
const { assert, should } = chai;
let authtoken1;
let businessId1;

should();
chai.use(chaiHttp);

describe('Review controller tests', () => {
  before((done) => {
    Review.sync({ force: true })
      .then(() => done());
  });
  describe('Given that a user sends a POST request to /api/v1/businesses/:businessId/reviews', () => {
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

    before((done) => {
      chai.request(app)
        .post('/api/v1/businesses/')
        .set('authorization', authtoken1)
        .type('form')
        .send(businessData.business6)
        .end((err, res) => {
          businessId1 = res.body.business.id;
          done();
        });
    });

    it('should return 201 status code and add review to business', (done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.review.should.be.a('object');
          assert.isString(
            res.body.message,
            'Review was successfully added'
          );
          assert.deepEqual(
            res.body.review.review,
            reviewData.review1.review,
            'The created review object'
          );
          done();
        });
    });

    it('should return 401 status code when a token is not valid', (done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', 'authtokenIsAnInvalidString')
        .type('form')
        .send(reviewData.review1)
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
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .type('form')
        .send(reviewData.review1)
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

    it('should return 404 status code when businessId is not found', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/anyInvalidBusinessId/reviews')
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review1)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business was not found'
          );
          done();
        });
    });

    it('should return 406 status code when review field is empty', (done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review3)
        .end((err, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'The review input field cannot be empty'
          );
          done();
        });
    });
  });

  describe('Given that a user sends a GET request to /api/v1/businesses/:businessId/reviews', () => {
    before((done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review2)
        .end(() => done());
    });

    it('should return 200 status code and retrieve all comments', (done) => {
      chai.request(app)
        .get(`/api/v1/businesses/${businessId1}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.reviews.should.be.a('array');
          assert.isString(
            res.body.message,
            'Reviews found'
          );
          assert.equal(
            res.body.reviews.length,
            2,
            'There are presently two reviews for this business'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not found', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/anyInvalidBusinessId/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Business was not found'
          );
          done();
        });
    });
  });
});
