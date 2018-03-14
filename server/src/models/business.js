module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Business name already exists'
      }
    },
    businessImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
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
          message: 'Only letters are allowed'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[a-z]+$/i,
          message: 'Only letters are allowed'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\d*$/,
          message: 'Only numbers are allowed'
        }
      }
    },
    postalAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    workHours: {
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
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};
