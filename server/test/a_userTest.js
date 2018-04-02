import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../../app';
import db from './../src/models';
import { userData } from './../mockData/serveMockData';

const { User } = db;
const { assert, should } = chai;
let authtoken1;

should();
chai.use(chaiHttp);

describe('Given that a user sends a', () => {
  before((done) => {
    User.sync({ force: true })
      .then(() => done());
  });

  describe('POST request to /api/v1/auth/signup', () => {
    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user1)
        .end((err, res) => {
          const { firstname, lastname, email } = res.body.data.user;
          res.should.have.status(201);
          assert.equal(
            res.body.status,
            'success',
          );
          assert.equal(
            firstname.toLowerCase(),
            userData.user1.firstname.toLocaleLowerCase(),
            'Firstname equal'
          );
          assert.equal(
            lastname.toLowerCase(),
            userData.user1.lastname.toLowerCase(),
            'Lastname equal'
          );
          assert.equal(
            email.toLowerCase(),
            userData.user1.email.toLowerCase(),
            'email equal'
          );
          assert.isNotNull(
            res.body.data.token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user2)
        .end((err, res) => {
          const { firstname, lastname, email } = res.body.data.user;
          res.should.have.status(201);
          assert.equal(
            res.body.status,
            'success',
          );
          assert.equal(
            firstname.toLowerCase(),
            userData.user2.firstname.toLocaleLowerCase(),
            'Firstname equal'
          );
          assert.equal(
            lastname.toLowerCase(),
            userData.user2.lastname.toLowerCase(),
            'Lastname equal'
          );
          assert.equal(
            email.toLowerCase(),
            userData.user2.email.toLowerCase(),
            'email equal'
          );
          assert.isNotNull(
            res.body.data.token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 201 status code and create new user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          const { firstname, lastname, email } = res.body.data.user;
          res.should.have.status(201);
          assert.equal(
            res.body.status,
            'success',
          );
          assert.equal(
            firstname.toLowerCase(),
            userData.user6.firstname.toLocaleLowerCase(),
            'Firstname equal'
          );
          assert.equal(
            lastname.toLowerCase(),
            userData.user6.lastname.toLowerCase(),
            'Lastname equal'
          );
          assert.equal(
            email.toLowerCase(),
            userData.user6.email.toLowerCase(),
            'email equal'
          );
          assert.isNotNull(
            res.body.data.token,
            'Token should be available'
          );
          authtoken1 = res.body.data.token;
          done();
        });
    });

    it('should return 400 status code when email is not valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user5)
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.status,
            'fail'
          );
          res.body.error.should.have.be.a('array');
          assert.equal(
            res.body.error[0],
            'Invalid email',
            'Email is not valid'
          );
          done();
        });
    });

    it('should return 400 status code if any input field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user4)
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.status,
            'fail'
          );
          res.body.error.should.have.be.a('array');
          done();
        });
    });

    it('should return 400 status code when registering a duplicate email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(userData.user1)
        .end((err, res) => {
          res.should.have.status(400);
          assert.strictEqual(
            res.body.status,
            'fail'
          );
          res.body.error.should.have.be.a('array');
          done();
        });
    });
  });

  describe('POST request to /api/v1/auth/login', () => {
    it('should return 200 status code and log the user into his/her account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user1.password
        })
        .end((err, res) => {
          const { firstname, lastname } = res.body.data.user;
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            firstname.toLowerCase(),
            userData.user1.firstname.toLocaleLowerCase(),
            'Firstname equal'
          );
          assert.equal(
            lastname.toLowerCase(),
            userData.user1.lastname.toLowerCase(),
            'Lastname equal'
          );
          assert.isNotNull(
            res.body.data.token,
            'Token should be available'
          );
          done();
        });
    });

    it('should return 400 status code if any input field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user4.email,
          password: userData.user4.password
        })
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          res.body.error.should.be.a('array');
          done();
        });
    });

    it('should return 401 status code when wrong password is given', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user1.email,
          password: userData.user2.password
        })
        .end((err, res) => {
          res.should.have.status(401);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.strictEqual(
            res.body.error,
            'Wrong password',
            'Password does not match the email in database'
          );
          done();
        });
    });

    it('should return 404 status code when email is not registered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: userData.user3.email,
          password: userData.user3.password
        })
        .end((err, res) => {
          res.should.have.status(404);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.strictEqual(
            res.body.error,
            'User not found',
            'Email not in the database'
          );
          done();
        });
    });
  });

  describe('PUT request to /api/v1/user', () => {
    it('should return 200 status code and update user details', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user6)
        .end((err, res) => {
          const { firstname, lastname, email } = res.body.data.user;
          res.should.have.status(200);
          assert.equal(
            res.body.status,
            'success'
          );
          assert.equal(
            firstname,
            userData.user6.firstname,
            'firstname updated'
          );
          assert.equal(
            lastname,
            userData.user6.lastname,
            'lastname updated'
          );
          assert.equal(
            email,
            userData.user6.email,
            'email updated'
          );
          done();
        });
    });

    it('should return 400 status code when email is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user5)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          assert.equal(
            res.body.error[0],
            'Invalid email',
            'Email is not valid'
          );
          done();
        });
    });

    it('should return 400 status code when an input field is empty', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', authtoken1)
        .type('form')
        .send(userData.user4)
        .end((err, res) => {
          res.should.have.status(400);
          assert.equal(
            res.body.status,
            'fail'
          );
          res.body.error.should.be.a('array');
          done();
        });
    });

    it('should return 401 status code when a token is not valid', (done) => {
      chai.request(app)
        .put('/api/v1/user')
        .set('authorization', 'authtoken1IsAnInvalidString')
        .type('form')
        .send(userData.user6)
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
        .put('/api/v1/user')
        .type('form')
        .send(userData.user6)
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
  });
});
