import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { assert, should } = chai;

should();
chai.use(chaiHttp);

describe('Given that a user sends a ', () => {
  describe('GET request to /api/v1/categories', () => {
    it('should return 200 status code and list available categories', (done) => {
      chai.request(app)
        .get('/api/v1/categories')
        .end((err, res) => {
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          res.body.data.should.be.a('array');
          done();
        });
    });
  });
});
