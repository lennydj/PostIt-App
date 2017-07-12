const Groups = require('../models').Groups;
//const Users = require('../models').Users;
//const UserGroups = require('../models').UserGroups;

module.exports = {
  create(req, res) {
    return Groups
      .create({
        groupname: req.body.groupname,
        createdby: req.body.createdby
      });
    // Users.findOne({ where: { createdby: req.body.createdby } })
    // .then((usergroup) => {
    /* return UserGroups
      .create({
          usergroupsid: req.body.createdby,
          groupisd: Users.findOne({ where: { groupname: req.body.groupname } })
        })
      .then(groups => res.status(201).send(groups))
      .catch(error => res.status(400).send(error));*/
  },
};
