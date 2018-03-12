module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defautValue: Sequelize.UUIDV4
    },
    businessName: {
      type: Sequelize.STRING,
      allowNul: false
    },
    businessImage: {
      type: Sequelize.STRING,
      allowNul: true
    },
    category: {
      type: Sequelize.ENUM,
      values: ['uncategorized', 'resturant', 'bar', 'cinema', 'cafe', 'services'],
      defautValue: 'uncategorized',
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
    workHours: {
      type: Sequelize.STRING,
      allowNull: true
    },
    about: {
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
  down: queryInterface => queryInterface.dropTable('Businesses')
};
