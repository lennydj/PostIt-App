// import app from '../app';
const app = require('../app');

const should = require('chai').should(),
expect = require('chai').expect,
supertest = require('supertest');

const api = supertest('localhost:8000');

const requestHandler = supertest(app);

describe('user', function () {
  it('should return a 200 response', function (done) {
    api.get('/api')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  const testUser = {
    username: 'Chiggy',
    password: 'chig123',
    email: 'chig@yahoo.ng',
    phonenumber: '01245622',
  };

  let token = '';

  describe('User', () => {
    it('should create new user', (done) => {
      requestHandler.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(testUser)
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(testUser.username);
          token = res.body.data.token;
          done();
        });
    });
  });
});

