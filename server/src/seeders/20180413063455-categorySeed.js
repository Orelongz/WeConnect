const uuidv4 = require('uuid/v4');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      id: uuidv4(),
      category: 'IT',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      category: 'Bar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      category: 'Spa',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      category: 'Gym',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      category: 'Cinemas',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      category: 'Services',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
