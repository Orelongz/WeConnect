module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Business name exists'
      }
    },
    businessImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'Category must be letters'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'City must be letters'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          msg: 'State must be letters'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\d*$/,
          msg: 'Phone number must be numbers'
        }
      }
    },
    postalAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    closeTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  // associations can be defined here
  Business.associate = (models) => {
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Business.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
  };

  return Business;
};
