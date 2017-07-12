module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    groupname: {
      type: DataTypes.STRING,
      unique: true
    },
    createdby: {
      type: DataTypes.INTEGER
    },
    // userGroupId: {
    //   type: DataTypes.INTEGER,
    //   unique: true
    // },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   unique: true,
    //   allowNull: false
    // },
  },
  {
    associate: (models) => {
      // associations can be defined here
      Groups.belongsToMany(models.UserGroups, {
        through: 'UserGroups',
        as: 'userGroupId',
      });
      Groups.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'createdby',
      });
    }
  });
  return Groups;
};
