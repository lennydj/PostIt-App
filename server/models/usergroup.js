module.exports = (sequelize, DataTypes) => {
  const usergroup = sequelize.define('usergroup', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return usergroup;
};
