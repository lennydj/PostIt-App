module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define('UserGroups', {
    userGroupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return UserGroups;
};
