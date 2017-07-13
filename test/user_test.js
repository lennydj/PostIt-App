const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('localhost:8000');

describe('user', function () {
  it('should return a 200 response', function (done) {
    api.get('/api')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should be an object with keys and values', function (done) {
    api.post('/api/users/signup')
      .set('Accept', 'application/json')
      .expect(201)
      .end(function(err, res) {
        expect(res.body).to.have.property('username');
        expect(res.body.username).to.not.equal(null);
        expect(res.body).to.have.property('password');
        expect(res.body.password).to.not.equal(null);
        expect(res.body).to.have.property('email');
        expect(res.body.email).to.not.equal(null);
        expect(res.body).to.have.property('phonenumber');
        expect(res.body.phonenumber).to.not.equal(null);
        done();
      });
  });
});
