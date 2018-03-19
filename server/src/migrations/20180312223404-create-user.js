module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      allowNul: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNul: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hashedPassword: {
      type: Sequelize.STRING,
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('Users')
};
