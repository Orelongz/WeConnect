module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  // associations can be defined here
  Category.associate = (models) => {
    Category.hasMany(models.Business, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
