module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    themessage: DataTypes.STRING,
    prioritylevel: DataTypes.STRING,
    Username: DataTypes.STRING,
    senderid: DataTypes.INTEGER,
    groupid: DataTypes.INTEGER
  }, {
    associate: (models) => {
      // associations can be defined here
      message.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'senderid',
      });
      message.belongsTo(models.user, {
        foreignKey: 'groupId',
        as: 'groupid',
      });
    }
  });
  return message;
};
