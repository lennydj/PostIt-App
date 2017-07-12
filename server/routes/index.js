// import express from 'express';
import usersController from '../controllers/users';
import groupsController from '../controllers/groups';

// const usersController = require('../controllers').users;

// const app = express.Router();
module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to PostIt!',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.signin);

  app.post('/api/users/groups', groupsController.create);
};
