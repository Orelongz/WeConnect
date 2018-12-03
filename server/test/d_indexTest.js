import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { assert, should } = chai;

should();
chai.use(chaiHttp);

describe('Given that a user sends a ', () => {
  describe('GET request to /api/v1', () => {
    it('should return 200 status code', (done) => {
      chai.request(app)
        .get('/api/v1')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.message,
            'Welcome to WeConnect'
          );
          done();
        });
    });
  });

  describe('GET/POST/PUT/DELETE request to an invalid route', () => {
    it('should return 404 status code', (done) => {
      chai.request(app)
        .get('/api/v1/anyOtherRoute')
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.message,
            'Route not available'
          );
          done();
        });
    });
  });
});
