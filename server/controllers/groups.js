// import models from '../models';
const models = require('../models');

const groups = models.group;

module.exports.create = (req, res) => {
  if ((req.body.groupname).length === 0 || (req.body.createdby).length === 0) {
    res.status(400).send({ message: 'Please enter your groupname and ensure you are signed in' });
  } else {
  // Check if the group exists already
    groups.findOne({ where: { groupname: req.body.groupname } })
      .then((group) => {
        if (group) {
          res.status(400).send({ message: 'Group already exists, please select another groupname' });
        } else {
        // Create the group since it does not exist
          groups.create({
            groupname: req.body.groupname,
            createdby: req.body.createdby
          })
            .then(res.status(200).send({ message: 'Group Created' }))
            .catch(err => res.status(400).send(err));
        }
      });
  }
};
