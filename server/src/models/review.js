module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        checkRatingInput(value) {
          value = parseInt(value, 10);
          if (!(value >= 0 && value <= 5)) {
            throw new Error('Rating value must be between 0 and 5');
          }
        }
      }
    }
  });
    // associations can be defined here
  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
