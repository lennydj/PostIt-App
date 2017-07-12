module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phonenumber: {
      type: DataTypes.INTEGER,
    },
  }, {
    associate: (models) => {
      // associations can be defined here
      Users.belongsToMany(models.groups, {
        through: 'UserGroups',
        as: 'groupid',
      });
    }
  });
  return Users;
};
