// import app from '../app';
const app = require('../app');
const supertest = require('supertest');
const models = require('../server/models');
const testdata = require('./seeders/testdata');

const expect = require('chai').expect;

const api = supertest('localhost:8000');

const requestHandler = supertest(app);
let token;

before((done) => {
  models.user.bulkCreate(testdata.users)
    .then(() => { done(); })
    .catch((err) => { console.log(err, 'error'); });
});

after((done) => {
  models.sequelize.sync({ force: true })
    .then(() => {
      done();
    });
});

describe('user', () => {
  describe('User', () => {
    it('should create new user', (done) => {
      requestHandler.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(testdata.testUser)
        .end((err, res) => {
          token = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(testdata.testUser.username);
          done();
        });
    });

    it('should not create same user twice', (done) => {
      requestHandler.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(testdata.testUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Username or email already exists, please choose another username/email');
          done();
        });
    });

    it('should not create a user with no details', (done) => {
      requestHandler.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send({
          username: '',
          password: '',
          email: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter a username, password and email');
          done();
        });
    });

    it('should login user', (done) => {
      requestHandler.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'Helen',
          password: 'password123',
        })
        .end((err, res) => {
          token = res.body.token;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not login with invalid credentials', (done) => {
      requestHandler.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'Helen',
          password: 'test',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.be.equal('Your username/password is incorrect, Please retry with the correct details');
          done();
        });
    });

    it('should not prompt a user for username and password if none is entered', (done) => {
      requestHandler.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: '',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter your username and password');
          done();
        });
    });

    it('should create new group', (done) => {
      requestHandler.post('/api/group')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testdata.group)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Group Created');
          done();
        });
    });

    it('should not create same group twice', (done) => {
      requestHandler.post('/api/group')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testdata.group)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Group already exists, please select another groupname');
          done();
        });
    });

    it('should not create a group with no details', (done) => {
      requestHandler.post('/api/group')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          groupname: '',
          createdby: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter your groupname and ensure you are signed in');
          done();
        });
    });

    it('should not create group without token', (done) => {
      requestHandler.post('/api/group')
        .set('Accept', 'application/json')
        .send(testdata.group)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should add a user to a group', (done) => {
      requestHandler.post('/api/group/1/user')
        .set('Accept', 'application/json')
        .set('authorization', token)
        // .send(testdata.usergroup)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User has been added to the group');
          done();
        });
    });

    it('should not create same user in a group twice', (done) => {
      requestHandler.post('/api/group/1/user')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testdata.usergroup)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('User already added to the group. Please reconfirm');
          done();
        });
    });

    /* it('should not add empty user details in a group', (done) => {
      requestHandler.post('/api/group/1/user')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          userid: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please select the user to be added');
          done();
        });
    }); */

    it('should not add a user to a group without token', (done) => {
      requestHandler.post('/api/group/1/user')
        .set('Accept', 'application/json')
        .send(testdata.usergroup)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should post a message to a group he belongs to', (done) => {
      requestHandler.post('/api/group/1/message')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testdata.message)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('New message posted');
          done();
        });
    });

    it('should not add empty message to a group', (done) => {
      requestHandler.post('/api/group/1/message')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          themessage: '',
          Username: 'Lennyg',
          prioritylevel: 'High',
          senderid: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter the message to be posted');
          done();
        });
    });

    it('should not post a message to a group without token', (done) => {
      requestHandler.post('/api/group/1/message')
        .set('Accept', 'application/json')
        .send(testdata.message)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should show all messages in a group', (done) => {
      requestHandler.get('/api/group/1/messages')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });

    it('should not show messages in a group without token', (done) => {
      requestHandler.get('/api/group/1/messages')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should login user', (done) => {
      requestHandler.post('/api/user/signin')
        .set('Accept', 'application/json')
        .send({
          username: 'David',
          password: 'password234',
        })
        .end((err, res) => {
          token = res.body.token;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not post a message to a group user does not belong to', (done) => {
      requestHandler.post('/api/group/1/message')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({ themessage: 'Please note that test is ongoing here',
          Username: 'David',
          prioritylevel: 'High',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Sender does not belong to the Group');
          done();
        });
    });
  });
});

