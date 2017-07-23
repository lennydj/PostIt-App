
// import usersController from '../controllers/users';
// import groupsController from '../controllers/groups';
// import usergroupsController from '../controllers/usergroups';
// import messagesController from '../controllers/messages';
// import authorize from '../../jsontoken';
const usersController = require('../controllers').users;
const groupsController = require('../controllers').groups;
const usergroupsController = require('../controllers').usergroups;
const messagesController = require('../controllers').messages;
const authorize = require('../../jsontoken');

// const app = express.Router();
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to PostIt!',
  }));

  app.post('/api/user/signup', usersController.create);
  app.post('/api/user/signin', usersController.signin);
  // app.use(authorize.verifyUser);

  app.post('/api/group', authorize.verifyUser, groupsController.create);
  app.post('/api/group/:groupid/user', authorize.verifyUser, usergroupsController.createUser);
  app.post('/api/group/:groupid/message', authorize.verifyUser, messagesController.create);
  app.get('/api/group/:groupid/messages', authorize.verifyUser, messagesController.findAll);
};
