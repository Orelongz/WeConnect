module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defautValue: DataTypes.UUIDV4
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  // associations can be defined here
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Business, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
