import validator from 'validator';
import { db } from './../models';
import { notFound } from './../services/genericMessages';

const { Business } = db;
/**
 * @class businessMiddleware
 * @desc middleware for business route
 */
export default class BusinessMiddleware {
  /**
   * businessValidation()
   * @desc handles validation of business input fields
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Object} next Express next middleware function
   * @return {*} error, void
   */
  static businessValidation(req, res, next) {
    const error = [];
    const {
      businessName, category, address, city, state, phoneNumber, about
    } = req.body;
    if (!businessName || businessName.trim() === '') {
      error.push('The business Name field cannot be empty');
    }
    if (!category || category.trim() === '') {
      error.push('Choose a category your business belongs to');
    }
    if (!address || address.trim() === '') {
      error.push('The address field cannot be empty');
    }
    if (!city || city.trim() === '') {
      error.push('The city field cannot be empty');
    }
    if (!state || state === '...Choose') {
      error.push('Please choose a state');
    }
    if (!phoneNumber || phoneNumber === '...Choose') {
      error.push('Kindly put in the phone number of your business');
    }
    if (!about || about.trim() === '') {
      error.push('Say something about your business');
    }
    if (error.length > 0) {
      return res.status(406).json({ error });
    }
    return next();
  }

  /**
   * findBusinessByName()
   * @desc finds a business by its Id
   * @param {Object} req request object
   * @param {Array} res allBusinesses array
   * @param {Object} next Express next middleware function
   * @return {Array} business
   */
  static findBusiness(req, res, next) {
    const { businessId } = req.params;

    if (!validator.isUUID(businessId)) {
      return notFound(res, 'Business');
    }

    Business.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return notFound(res, 'Business');
        }
        req.foundBusiness = business;
        return next();
      });
  }

  /**
   * businessNameExist()
   * @desc finds a business by its Id
   * @param {Object} req request object
   * @param {Array} res allBusinesses array
   * @param {Object} next Express next middleware function
   * @return {Array} business
   */
  static businessNameExist(req, res, next) {
    const { businessName } = req.body;

    Business.findOne({
      where: {
        businessName
      }
    })
      .then((business) => {
        if (business) {
          const { businessId } = req.params;
          if (business.id === businessId) return next();
          return res.status(409).json({
            message: 'Business name already exists'
          });
        }
        return next();
      });
  }
}
