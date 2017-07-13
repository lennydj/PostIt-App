// import express from 'express';
import usersController from '../controllers/users';
import groupsController from '../controllers/groups';
import usergroupsController from '../controllers/usergroups';
import messagesController from '../controllers/messages';
import authorize from '../../jsontoken';
// const usersController = require('../controllers').users;

// const app = express.Router();
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to PostIt!',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.signin);
  app.use(authorize.verifyUser);

  app.post('/api/users/groups', groupsController.create);
  app.post('/api/group/:groupid/message', messagesController.create);
  app.get('/api/group/:groupid/messages', messagesController.findAll);
  app.post('/api/group/:groupid/user', usergroupsController.createUser);
};
