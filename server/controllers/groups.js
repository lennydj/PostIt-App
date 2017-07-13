import models from '../models';

const group = models.group;

module.exports.create = (req, res) => {
  // Check if the group exists already
  group.findOne({ where: { groupname: req.body.groupname } })
    .then((existinggroup) => {
      if (existinggroup) {
        res.send('Group already exists, please select another groupname');
      } else {
        // Create the group since it does not exist
        group.create({
          groupname: req.body.groupname,
          createdby: req.body.createdby
        })
          .then(res.status(201).send('Group Created'))
          .catch(err => res.status(400).send(err));
      }
    });
};
