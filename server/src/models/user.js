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
        isAlpha: {
          args: true,
          msg: 'Firstname must be letters'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          argsisAlpha: true,
          msg: 'Lastname must be letters'
        }
      }
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'User exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      defaultValue: ''
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
