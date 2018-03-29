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
    const message = [];
    const {
      businessName, category, address, city, state, phoneNumber, about
    } = req.body;
    if (!businessName || businessName.trim() === '' || typeof businessName !== 'string') {
      message.push('The business Name field cannot be empty and must be a string');
    }
    if (!category || category.trim() === '' || typeof category !== 'string') {
      message.push('Choose a category your business belongs to');
    }
    if (!address || address.trim() === '' || typeof address !== 'string') {
      message.push('The address field cannot be empty and must be a string');
    }
    if (!city || city.trim() === '' || typeof city !== 'string') {
      message.push('The city field cannot be empty and must be a string');
    }
    if (!state || state.trim() === '' || typeof state !== 'string') {
      message.push('Please choose a state and must be a string');
    }
    if (!phoneNumber || phoneNumber.trim() === '' || typeof phoneNumber !== 'string') {
      message.push('Kindly put in the phone number of your business and it must be a string');
    }
    if (!about || about.trim() === '' || typeof about !== 'string') {
      message.push('Say something about your business');
    }
    if (message.length > 0) {
      return res.status(400).json({ message });
    }
    return next();
  }

  /**
   * findBusiness()
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
      })
      .catch(error => res.status(500).json({ error }));
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
            message: 'Business name exists'
          });
        }
        return next();
      })
      .catch(error => res.status(500).json({ error }));
  }
}
