// import models from '../models';
const models = require('../models');

// const message = models.message;
const groupusers = models.usergroup;
const messages = models.message;


module.exports.create = (req, res) => {
  if ((req.body.themessage).length === 0) {
    res.status(400).send({ message: 'Please enter the message to be posted' });
  } else {
    groupusers.findOne({ where: { groupid: parseInt(req.params.groupid), $and: { userid: parseInt(req.body.senderid) } } })
      .then((groupuser) => {
        if (!groupuser) {
          res.status(400).send({ message: 'Sender does not belong to the Group' });
        } else {
          messages.create({
            themessage: req.body.themessage,
            Username: req.body.Username,
            prioritylevel: req.body.prioritylevel,
            senderid: parseInt(req.body.senderid),
            groupid: parseInt(req.params.groupid)
          })
            .then(() => res.status(200).send({ message: 'New message posted' }))
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      });
  }
};

// Get messages controller
module.exports.findAll = (req, res) => {
  messages.findAll({ where: { groupid: parseInt(req.params.groupid) } })
    .then((usermessages) => {
      if (usermessages) {
        res.status(200).send(usermessages);
      } else if (!usermessages) {
        res.status(200).send({ message: 'There are no messages in this group' })
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
};
