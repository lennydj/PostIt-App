// import models from '../models';
const models = require('../models');

const usersgroup = models.usergroup;

module.exports.createUser = (req, res) => {
  const userid = req.decoded.id;
  const groupid = req.params.groupid;
  //if (req.body.userid === '' || undefined) {
  // res.status(400).send({ message: 'Please select the user to be added' });
  // } else {
  // Check if the user exists in the same group
  usersgroup.findOne({ where: {
    userid,
    $and: { groupid } } })
    .then((usergroups) => {
      // If the user does not exist, create the user
      if (!usergroups) {
        usersgroup.create({
          userid,
          groupid,
        })
          .then(() => res.status(200).send({ message: 'User has been added to the group' }))
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        // Or prompt that the user is already in the group
        res.status(400).send({ message: 'User already added to the group. Please reconfirm' });
      }
    });
  //}
};

