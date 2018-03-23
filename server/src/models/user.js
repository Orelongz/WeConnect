module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'Only letters are allowed'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'Only letters are allowed'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Enter a valid email'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // associations can be defined here
  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return User;
};
