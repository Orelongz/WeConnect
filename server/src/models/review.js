module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
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
