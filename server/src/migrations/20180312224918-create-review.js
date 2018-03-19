module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    reviewId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'userId'
      }
    },
    businessId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Businesses',
        key: 'businessId'
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
