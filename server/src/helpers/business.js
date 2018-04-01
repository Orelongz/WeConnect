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
    category: category.toLowerCase(),
    address,
    city: city.toLowerCase(),
    state: state.toLowerCase(),
    phoneNumber,
    about
  };
  return business;
};

/**
 * handleBusinessSearch()
 * @desc handles business search
 * @param {Object} req request object
 * @return {Object} theBusiness
 */
const handleBusinessSearch = (req) => {
  const { location, category } = req.query;
  const search = {};
  if (location) {
    search.city = location.toLowerCase();
    search.state = location.toLowerCase();
  }
  if (category) {
    search.category = category.toLowerCase();
  }

  let databaseQuery;
  if (Object.keys(search).length === 0) {
    databaseQuery = {};
  } else {
    databaseQuery = { where: { [Op.or]: search } };
  }

  return databaseQuery;
};

export { businessObjectHolder, handleBusinessSearch };
