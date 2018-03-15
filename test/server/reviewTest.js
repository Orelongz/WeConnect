import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../server/app';
import { db } from './../../server/src/models';
import { dummyReview } from './../helpers/dummy';

const { User, Business, Review } = db;
const { assert, should } = chai;

should();
chai.use(chaiHttp);

describe('Review controller tests', () => {
  before((done) => {
    Review.sync({ force: true })
      .then(() => Business.sync({ force: true }))
      .then(() => User.sync({ force: true }))
      .then(() => done())
      .catch(err => done(err));
  });
  describe('Given that a user sends a POST request to /api/v1/businesses/:businessId/reviews', () => {
    it('should return 201 status code and add review to business', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/3/reviews')
        .type('form')
        .send(dummyReview.validReview1)
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
            dummyReview.validReview1.review,
            'The created review object'
          );
          done();
        });
    });

    it('should return 404 status code when businessId is not found', (done) => {
      chai.request(app)
        .post('/api/v1/businesses/7/reviews')
        .type('form')
        .send(dummyReview.validReview1)
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
        .post('/api/v1/businesses/1/reviews')
        .type('form')
        .send(dummyReview.inValidReview1)
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
        .post('/api/v1/businesses/3/reviews')
        .type('form')
        .send(dummyReview.validReview2)
        .end(() => done());
    });

    it('should return 200 status code and retrieve all comments', (done) => {
      chai.request(app)
        .get('/api/v1/businesses/3/reviews')
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
        .get('/api/v1/businesses/7/reviews')
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
