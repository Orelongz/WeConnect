module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defautValue: Sequelize.UUIDV4
    },
    UserId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    BusinessId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Businesses',
        key: 'id'
      }
    },
    review: {
      type: Sequelize.TEXT,
      allowNul: false
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
  down: queryInterface => queryInterface.dropTable('Reviews')
};
