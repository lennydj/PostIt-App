module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupname: {
        type: Sequelize.STRING
      },
      createdby: {
        type: Sequelize.INTEGER,
        // defaultValue: 1
        references: {
          model: 'users',
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
      },
    }),
  down: queryInterface /* Sequelize */ =>
    queryInterface.dropTable('groups'),
};
