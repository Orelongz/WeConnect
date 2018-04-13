import { Op } from 'sequelize';
import db from './../models';

const { Category } = db;

/**
 * checkCategory()
 * @desc handles update of business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} response
 */
const checkCategory = (req, res) => {
  const { category } = req.body;

  Category.findOne({ where: { category } })
    .then((theCategory) => {
      if (!theCategory) {
        return res.status(400).json({
          status: 'fail',
          error: 'Choose a category'
        });
      }
    });
};

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
    category: category.toLowerCase(),
    address,
    city: city.toLowerCase(),
    state: state.toLowerCase(),
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
    search.city = location.toLowerCase();
    search.state = location.toLowerCase();
  }
  if (category) {
    search.category = category.toLowerCase();
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
  checkCategory,
  businessObjectHolder,
  handleBusinessSearch
};
