module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      themessage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prioritylevel: {
        type: Sequelize.STRING
      },
      senderid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
      },
      groupid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'groups',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface /* , Sequelize */ =>
    queryInterface.dropTable('messages'),
};
