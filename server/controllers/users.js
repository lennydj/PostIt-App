// import jwt from 'jsonwebtoken';
// import models from '../models';
const jwt = require('jsonwebtoken');
const models = require('../models');

const users = models.user;
// const jwt = require('jsonwebtoken');

module.exports.create = (req, res) => {
  if ((req.body.username).length === 0 || (req.body.password).length === 0 || (req.body.email).length === 0) {
    res.status(400).send({ message: 'Please enter a username, password and email' });
  } else {
    users.findOne({ where: { $or: [{ username: req.body.username }, { email: req.body.email }] } })
      .then((user) => {
      // Check if the username exists already
        if (!user) {
        // Create if it does not exist
          users.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
          })
            .then((userObj) => {
              const usertoken = jwt.sign({ user: userObj.id }, 'myownsecret',
                { expiresIn: 24 * 60 * 60 });
              res.status(200).send({ token: usertoken, username: userObj.username });
            //  { token: usertoken, users: users.id, username: users.username });            
            });
        } else {
          res.status(400).send({ message: 'Username or email already exists, please choose another username/email' });
        }
      })
    // .then(res.status(201).send(usertoken))
      .catch(err =>
        res.status(400).send({ message: 'Enrollment Failed, Please reconfirm details' }));
  }
};

module.exports.signin = (req, res) => {
  if ((req.body.username).length === 0 || (req.body.password).length === 0) {
    res.status(400).send({ message: 'Please enter your username and password' });
  } else {
    // Find the user
    users.findOne({ where:
    { username: req.body.username, $and: { password: req.body.password } } })
      .then((user) => {
        if (user) {
        // Allow Login if the credentials are correct
        // res.send('Login Successful! You have 5 pending notifications');
        // .then((users) => {
          const usertoken = jwt.sign({ users: users.id }, 'myownsecret',
            { expiresIn: 24 * 60 * 60 });
          res.status(200).send(
            { token: usertoken, users: users.id, username: users.username });
        } else {
        // Fail if the credentials are wrong
          res.status(400).send({ message: 'Your username/password is incorrect, Please retry with the correct details' });
        }
      });
  }
};
