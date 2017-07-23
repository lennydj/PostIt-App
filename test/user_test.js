// import app from '../app';
const app = require('../app');
const supertest = require('supertest');


const expect = require('chai').expect;

const api = supertest('localhost:8000');

const requestHandler = supertest(app);
let token;
describe('user', () => {
/*  it('should return a 200 response', function (done) {
    api.get('/api')
      .set('Accept', 'application/json')
      .expect(200, done);
  }); */

  const testUser = {
    username: 'lenny37',
    password: 'lenny',
    email: 'lenny37@yahoo.ng',
    phonenumber: '01245622',
  };

  const testGroup = {
    groupname: 'Homebase16',
    createdby: 27,
  };

  const testUserGroup = {
    userid: 41,
  };

  const testMessage = {
    themessage: 'Please note that test is ongoing here',
    Username: 'Test234',
    prioritylevel: 'High',
    senderid: 30,
  };


  describe('User', () => {
    it('should create new user', (done) => {
      requestHandler.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(testUser)
        .end((err, res) => {
          token = res.body.token;
          expect(res.status).to.equal(200);
          expect(res.body.username).to.equal(testUser.username);
          done();
        });
    });

    it('should not create same user twice', (done) => {
      requestHandler.post('/api/user/signup')
        .set('Accept', 'application/json')
        .send(testUser)
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
          username: 'lenny31',
          password: 'lenny',
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
          username: 'lenny31',
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
        .send(testGroup)
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
        .send(testGroup)
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
        .send(testGroup)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should add a user to a group', (done) => {
      requestHandler.post('/api/group/10/user')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testUserGroup)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('User has been added to the group');
          done();
        });
    });

    it('should not create same user in a group twice', (done) => {
      requestHandler.post('/api/group/10/user')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testUserGroup)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('User already added to the group. Please reconfirm');
          done();
        });
    });

    it('should not add empty user details in a group', (done) => {
      requestHandler.post('/api/group/10/user')
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
    });

    it('should not add a user to a group without token', (done) => {
      requestHandler.post('/api/group/10/user')
        .set('Accept', 'application/json')
        .send(testUserGroup)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should post a message to a group he belongs to', (done) => {
      requestHandler.post('/api/group/10/message')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(testMessage)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('New message posted');
          done();
        });
    });

    it('should not post a message to a group user does not belong to', (done) => {
      requestHandler.post('/api/group/12/message')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({ themessage: 'Please note that test is ongoing here',
          Username: 'Lennyg',
          prioritylevel: 'High',
          senderid: 27, })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Sender does not belong to the Group');
          done();
        });
    });

    it('should not add empty message to a group', (done) => {
      requestHandler.post('/api/group/10/message')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({
          themessage: '',
          Username: 'Lennyg',
          prioritylevel: 'High',
          senderid: 27,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter the message to be posted');
          done();
        });
    });

    it('should not post a message to a group without token', (done) => {
      requestHandler.post('/api/group/10/message')
        .set('Accept', 'application/json')
        .send(testMessage)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });

    it('should show all messages in a group', (done) => {
      requestHandler.get('/api/group/10/messages')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should not show messages in a group without token', (done) => {
      requestHandler.get('/api/group/10/messages')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('Token not provided');
          done();
        });
    });
  });
});

