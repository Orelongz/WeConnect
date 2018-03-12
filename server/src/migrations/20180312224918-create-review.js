module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defautValue: Sequelize.UUIDV4
    },
    review: {
      type: Sequelize.STRING,
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
