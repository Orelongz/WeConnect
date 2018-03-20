import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../app';

const { assert, should } = chai;

should();
chai.use(chaiHttp);

describe('Index routes tests', () => {
  describe('Given that a user sends a GET request to /', () => {
    it('should return 200 status code', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Welcome to WeConnect'
          );
          done();
        });
    });

    it('should return 404 status code', (done) => {
      chai.request(app)
        .get('/anyotherroute')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          assert.isString(
            res.body.message,
            'Page not Found'
          );
          done();
        });
    });
  });
});
