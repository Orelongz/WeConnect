module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    firstname: {
      type: Sequelize.STRING,
      allowNul: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNul: false
    },
    userImage: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
