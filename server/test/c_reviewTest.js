import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../app';
import db from './../src/models';
import { userData, businessData, reviewData } from './../mockData/serveMockData';

const { Review } = db;
const { assert, should } = chai;
let authtoken1;
let businessId1;
let reviewId1;

should();
chai.use(chaiHttp);

describe('Given that a user sends a ', () => {
  before((done) => {
    Review.sync({ force: true })
      .then(() => done());
  });

  describe('POST request to /api/v1/businesses/:businessId/reviews', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user1.password
        })
        .end((err, res) => {
          authtoken1 = res.body.data.user.token;
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
          businessId1 = res.body.data.business.id;
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
          assert.equal(
            res.body.status,
            'success'
          );
          res.body.data.review.should.be.a('object');
          assert.equal(
            res.body.data.review.review,
            reviewData.review1.review,
            'Review created'
          );
          reviewId1 = res.body.data.review.id;
          done();
        });
    });
    it('should return 400 status code when rating value is not valid', (done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review5)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Rating value must be between 0 and 5'
          );
          done();
        });
    });

    it('should return 400 status code when review field is empty', (done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review3)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error[0],
            'Review must not be empty'
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
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
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
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Token absent'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not found', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/756581de-2e7a-11e8-b467-0ed5f89f718b/reviews')
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review1)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Business not found'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not a uuid', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/anyInvalidBusinessId/reviews')
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review1)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Business not found'
          );
          done();
        });
    });
  });

  describe('GET request to /api/v1/businesses/:businessId/reviews', () => {
    before((done) => {
      chai.request(app)
        .post(`/api/v1/businesses/${businessId1}/reviews`)
        .set('authorization', authtoken1)
        .type('form')
        .send(reviewData.review2)
        .end(() => done());
    });

    it('should return 200 status code and retrieve all reviews for the business', (done) => {
      chai.request(app)
        .get(`/api/v1/businesses/${businessId1}/reviews`)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          res.body.data.reviews.should.be.a('array');
          assert.equal(
            res.body.data.reviews.length,
            2,
            'There are presently two reviews for this business'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not uuid', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/anyInvalidBusinessId/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Business not found'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not found', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/756581de-2e7a-11e8-b467-0ed5f89f718b/reviews')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Business not found'
          );
          done();
        });
    });
  });

  describe('GET request to /api/v1/reviews/:reviewId', () => {
    it('should return a status 200 if review, business and user exists', (done) => {
      chai.request(app)
        .get(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', authtoken1)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          res.body.data.review.should.be.a('object');
          assert.isString(
            res.body.data.review.review,
            'Review was found'
          );
          done();
        });
    });

    it('should return a status 401 if token is not passed in', (done) => {
      chai.request(app)
        .get(`/api/v1/reviews/${reviewId1}`)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Token absent'
          );
          done();
        });
    });

    it('should return a status 401 if an invalid token is passed in', (done) => {
      chai.request(app)
        .get(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', 'anyInvalidTokenString')
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Invalid token'
          );
          done();
        });
    });

    it('should return a status 403 if user is not the owner of the review', (done) => {
      chai.request(app)
        .get('/api/v1/reviews/f64f2940-fae4-11e7-8c5f-ef356f279131')
        .set('authorization', authtoken1)
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Access to content denied'
          );
          done();
        });
    });

    it('should return a status 404 if reviewId is not uuid', (done) => {
      chai.request(app)
        .get('/api/v1/reviews/anyInvalidReviewIdString')
        .set('authorization', authtoken1)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Review not found'
          );
          done();
        });
    });
  });

  describe('PUT request to /api/v1/reviews/:reviewId', () => {
    it('should return a status 200 if review, business and user exists', (done) => {
      chai.request(app)
        .put(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', authtoken1)
        .send(reviewData.review4)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            res.body.data.review.review,
            reviewData.review4.review,
            'Review was found and updated'
          );
          done();
        });
    });

    it('should return a status 400 if review field is empty', (done) => {
      chai.request(app)
        .put(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', authtoken1)
        .send(reviewData.review3)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error[0],
            'Review must not be empty',
            'Review cannot be empty'
          );
          done();
        });
    });

    it('should return a status 401 if token is not passed in', (done) => {
      chai.request(app)
        .put(`/api/v1/reviews/${reviewId1}`)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Token absent'
          );
          done();
        });
    });

    it('should return a status 401 if an invalid token is passed in', (done) => {
      chai.request(app)
        .put(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', 'anyInvalidTokenString')
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Invalid token'
          );
          done();
        });
    });

    it('should return a status 403 if user is not the owner of the review', (done) => {
      chai.request(app)
        .put('/api/v1/reviews/f64f2940-fae4-11e7-8c5f-ef356f279131')
        .set('authorization', authtoken1)
        .send(reviewData.review4)
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Access to content denied'
          );
          done();
        });
    });

    it('should return a status 404 if reviewId is not uuid', (done) => {
      chai.request(app)
        .put('/api/v1/reviews/anyInvalidReviewIdString')
        .set('authorization', authtoken1)
        .send(reviewData.review4)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Review not found'
          );
          done();
        });
    });
  });

  describe('DELETE request to /api/v1/reviews/:reviewId', () => {
    it('should return a status 200 and delete the review', (done) => {
      chai.request(app)
        .delete(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', authtoken1)
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            res.body.message,
            'Review deleted',
            'Review was found and deleted'
          );
          done();
        });
    });

    it('should return a status 401 if token is not passed in', (done) => {
      chai.request(app)
        .delete(`/api/v1/reviews/${reviewId1}`)
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Token absent'
          );
          done();
        });
    });

    it('should return a status 401 if an invalid token is passed in', (done) => {
      chai.request(app)
        .delete(`/api/v1/reviews/${reviewId1}`)
        .set('authorization', 'anyInvalidTokenString')
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Invalid token'
          );
          done();
        });
    });

    it('should return a status 403 if user is not the owner of the review', (done) => {
      chai.request(app)
        .delete('/api/v1/reviews/f64f2940-fae4-11e7-8c5f-ef356f279131')
        .set('authorization', authtoken1)
        .send(reviewData.review4)
        .end((err, res) => {
          res.should.have.status(403);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Access to content denied'
          );
          done();
        });
    });

    it('should return a status 404 if reviewId is not uuid', (done) => {
      chai.request(app)
        .delete('/api/v1/reviews/anyInvalidReviewIdString')
        .set('authorization', authtoken1)
        .send(reviewData.review4)
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error,
            'Review not found'
          );
          done();
        });
    });
  });
});
