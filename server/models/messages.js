module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    themessage: DataTypes.STRING,
    prioritylevel: DataTypes.STRING
  }, {
    associate: (models) => {
      // associations can be defined here
      Messages.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'senderid',
      });
    }
  });
  return Messages;
};
