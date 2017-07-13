module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
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
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.INTEGER,
    },
  }, {
    associate: (models) => {
      // associations can be defined here
      user.belongsToMany(models.group, {
        through: 'usergroup',
      });
    }
  });
  return user;
};
