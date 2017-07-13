import models from '../models';

const usergroup = models.usergroup;

module.exports.createUser = (req, res) => {
  const usersgroup = usergroup;
  // Check if the user exists in the same group
  usersgroup.findOne({ where: { userid: parseInt(req.body.userid), $and: { groupid: parseInt(req.params.groupid) } } })
    .then((usergroups) => {
      // If the user does not exist, create the user
      if (!usergroups) {
        usersgroup.create({
          userid: parseInt(req.body.userid),
          groupid: parseInt(req.params.groupid),
        })
          .then(() => res.status(201).send('User has been added to the group'))
          .catch((err) => {
            res.status(400).send(err);
          });
      } else {
        // Or prompt that the user is already in the group
        res.send('User already added to the group. Please reconfirm');
      }
    });
};

