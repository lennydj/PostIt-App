import models from '../models';

//const message = models.message;
const groupusers = models.usergroup;
const messages = models.message;


module.exports.create = (req, res) => {
  const themessage = messages;
  groupusers.findOne({ where: { groupid: parseInt(req.params.groupid) } })
    .then((groupuser) => {
      if (!groupuser) {
        res.send('Invalid Group');
      } else {
        themessage.create({
          themessage: req.body.themessage,
          Username: req.body.Username,
          prioritylevel: req.body.prioritylevel,
          senderid: parseInt(req.body.senderid),
          groupid: parseInt(req.params.groupid)
        })
          .then(() => res.status(201).send('New message posted'))
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
};

// Get messages controller
module.exports.findAll = (req, res) => {
  messages.findAll({ where: { groupid: req.params.groupid } })
    .then((usermessages) => {
      if (usermessages) {
        res.send(usermessages);
      } else {
        res.send('There are no messages in this group for this user')
          .catch((err) => {
            res.status(400).send(err);
          });
      }
    });
};
