module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
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
      group.belongsToMany(models.usergroup, {
        through: 'usergroup',
      });
      group.belongsTo(models.user, {
        foreignKey: 'userId',
        as: 'createdby',
      });
    }
  });
  return group;
};
