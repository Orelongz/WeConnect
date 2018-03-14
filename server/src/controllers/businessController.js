import { db } from './../models';

const { Business } = db;

/**
 * updateObject()
 * @desc handles update of business
 * @param {Object} req request object
 * @return {Object} theBusiness
 */
const updateObject = (req) => {
  const {
    businessName, businessImage, category, address, city,
    state, phoneNumber, postalAddress, workHours, about
  } = req.body;

  const update = {
    businessName,
    businessImage,
    category,
    address,
    city,
    state,
    phoneNumber,
    postalAddress,
    workHours,
    about
  };
  return update;
};

/**
 * handleLocationSearch()
 * @desc checks businesses by location
 * @param {Object} req request object
 * @param {Array} businesses allBusinesses array
 * @return {Array} business
 */
const handleLocationSearch = (req, businesses) => {
  const { location } = req.query;
  if (location) {
    return businesses.filter(business => (
      (business.city.toLowerCase() === location.toLowerCase()) ||
      (business.state.toLowerCase() === location.toLowerCase())
    ));
  }
};

/**
 * handleCategorySearch()
 * @desc checks businesses by category
 * @param {Object} req request object
 * @param {Array} businesses allBusinesses array
 * @return {Array} business
 */
const handleCategorySearch = (req, businesses) => {
  const { category } = req.query;
  if (category) {
    return businesses.filter(business => (
      business.category.toLowerCase() === category.toLowerCase()
    ));
  }
};

/**
 * @class businessController
 * @desc handles the business routes
 */
export default class businessController {
  /**
   * createBusiness()
   * @desc Registers a new business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static createBusiness(req, res) {
    const {
      businessName, businessImage, category, address, city,
      state, phoneNumber, postalAddress, workHours, about
    } = req.body;

    return Business.create({
      businessName,
      businessImage,
      category,
      address,
      city,
      state,
      phoneNumber,
      postalAddress,
      workHours,
      about
    })
      .then(business => res.status(201).json({
        message: 'Business successfully created',
        business
      }))
      .catch(err => res.status(409).json({
        message: err.errors[0].message
      }));
  }

  /**
   * updateBusiness()
   * @desc updates an existing business profile
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static updateBusiness(req, res) {
    const update = updateObject(req);
    const { businessId } = req.params;
    return Business.findOne({
      where: {
        businessId
      }
    })
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'Business not found'
          });
        }
        return business.update({ ...update })
          .then(() => res.status(200).json({
            message: 'Business successfully updated',
            business
          }));
      });
  }

  /**
   * deleteBusiness()
   * @desc deletes an existing business profile
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static deleteBusiness(req, res) {
    const { businessId } = req.params;

    return Business.findOne({
      where: {
        businessId
      }
    })
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'Business not found'
          });
        }
        return business.destroy()
          .then(() => res.status(200).json({
            message: 'Business was successfully deleted',
            business
          }));
      });
  }

  /**
   * getBusiness()
   * @desc retrieve the details of a registered business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static getBusiness(req, res) {
    const { businessId } = req.params;

    return Business.findOne({
      where: {
        businessId
      }
    })
      .then((business) => {
        if (!business) {
          return res.status(404).json({
            message: 'Business not found'
          });
        }
        return res.status(200).json({
          message: 'Business was successfully found',
          business
        });
      });
  }

  /**
   * getAllBusinesses()
   * @desc retrieve the details of a registered business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static getAllBusinesses(req, res) {
    return Business.all()
      .then((businesses) => {
        const location = handleLocationSearch(req, businesses);
        const category = handleCategorySearch(req, businesses);
        if (!location && !category) {
          return res.status(200).json({
            message: 'All Businesses',
            businesses
          });
        }
        const theBusinesses = [...(location || []), ...(category || [])];
        if (theBusinesses.length === 0) {
          return res.status(200).json({
            message: 'There are no businesses matching your search'
          });
        }
        return res.status(200).json({
          message: 'Businesses found',
          businesses: theBusinesses
        });
      });
  }
}
