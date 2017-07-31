module.exports = (sequelize, DataTypes) => {
  const usergroup = sequelize.define('usergroup', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return usergroup;
};
