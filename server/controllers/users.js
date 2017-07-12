// import Users from '../models';

const Users = require('../models').Users;

module.exports = {
  create(req, res) {
    return Users
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
      })
      .then(users => res.status(201).send(users))
      .catch(error => res.status(400).send(error));
  },
  signin(req, res) {
    Users.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          res.send('Invalid Username');
        } else if (req.body.password !== user.password) {
          res.send('Incorrect Password');
        } else {
          res.status(201).send('Login successful');
        }
      });
  }
};
