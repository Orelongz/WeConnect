import { Op } from 'sequelize';

/**
 * businessObject()
 * @desc handles update of business
 * @param {Object} req request object
 * @return {Object} theBusiness
 */
const businessObjectHolder = (req) => {
  const {
    businessName, category, address, city, state, phoneNumber, about
  } = req.body;

  const business = {
    businessName,
    category,
    address,
    city,
    state,
    phoneNumber,
    about
  };
  return business;
};

/**
 * searchQueryHolder()
 * @desc handles update of business
 * @param {Object} req request object
 * @return {Object} theBusiness
 */
const searchQueryHolder = (req) => {
  const { location, category } = req.query;
  let search;
  if (location || category) {
    search = {
      where: {
        [Op.or]: [
          { city: location },
          { state: location },
          { category }
        ]
      }
    };
  } else {
    search = {};
  }
  return search;
};

export { businessObjectHolder, searchQueryHolder };
