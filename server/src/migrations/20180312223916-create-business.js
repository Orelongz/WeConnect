module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    categoryId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    businessImage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postalAddress: {
      type: Sequelize.STRING,
      allowNull: true
    },
    startTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    closeTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    about: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    rating: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
  down: queryInterface => queryInterface.dropTable('Businesses')
};
