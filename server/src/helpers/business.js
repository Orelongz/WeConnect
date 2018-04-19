import { Op } from 'sequelize';

/**
 * businessObject()
 * @desc handles update of business
 * @param {Object} req request object
 * @return {Object} theBusiness
 */
const businessObjectHolder = (req) => {
  const {
    businessName, category, address, city, state,
    phoneNumber, about, startTime, closeTime
  } = req.body;

  const business = {
    businessName,
    category,
    address,
    city,
    state,
    phoneNumber,
    about,
    startTime,
    closeTime
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
  const { location, category, name } = req.query;
  const search = {};
  if (location) {
    search.city = location;
    search.state = location;
  }
  if (category) {
    search.category = category;
  }
  if (name) {
    search.businessName = { [Op.iLike]: `%${name}%` };
  }

  let databaseQuery;
  if (Object.keys(search).length === 0) {
    databaseQuery = {};
  } else {
    databaseQuery = { where: { [Op.or]: search } };
  }

  return databaseQuery;
};

export {
  businessObjectHolder,
  handleBusinessSearch
};
