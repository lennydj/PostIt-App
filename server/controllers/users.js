import jwt from 'jsonwebtoken';
import models from '../models';

const users = models.user;
// const jwt = require('jsonwebtoken');

module.exports.create = (req, res) => {
  // const newUser = user;
  users.findOne({ where: { username: req.body.username } })
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
          .then((users) => {
            const usertoken = jwt.sign({ users: users.id }, 'myownsecret',
              { expiresIn: 24 * 60 * 60 });
            res.send(200, { token: usertoken, users: users.id, username: users.username });
          });
      } else {
        res.send('Username already exists, please choose another username');
      }
    })
  // .then(res.status(201).send(usertoken))
    .catch(err => res.status(400).send('Enrollment Failed, Please reconfirm details'));
};

module.exports.signin = (req, res) => {
  // Find the user
  users.findOne({ where: { username: req.body.username, $and: { password: req.body.password } } })
    .then((user) => {
      if (user) {
        // Allow Login if the credentials are correct
        res.send('Login Successful! You have 5 pending notifications');
      } else {
        // Fail if the credentials are wrong
        res.send('Your password/password is incorrect, Please retry with the correct details');
      }
    });
};
