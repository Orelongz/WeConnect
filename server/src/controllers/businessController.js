import validator from 'validator';
import { db } from './../models';
import BusinessServices from './../services/businessService';
import {
  notFound,
  unauthorized
} from './../services/genericMessages';

const {
  businessObject,
  handleLocationSearch,
  handleCategorySearch
} = BusinessServices;
const { Business } = db;

/**
 * @class businessController
 * @desc handles the business routes
 */
export default class BusinessController {
  /**
   * createBusiness()
   * @desc Registers a new business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static createBusiness(req, res) {
    const businessDetails = businessObject(req);

    return Business.create({ ...businessDetails })
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
    const { businessId } = req.params;

    if (!validator.isUUID(businessId)) {
      return notFound(res, 'Business');
    }

    return Business.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return notFound(res, 'Business');
        }
        const { id } = req.decoded;
        if (id !== business.userId) {
          return unauthorized(res);
        }
        const update = businessObject(req);
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

    if (!validator.isUUID(businessId)) {
      return notFound(res, 'Business');
    }

    return Business.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return notFound(res, 'Business');
        }
        const { id } = req.decoded;
        if (id !== business.userId) {
          return unauthorized(res);
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

    if (!validator.isUUID(businessId)) {
      return notFound(res, 'Business');
    }

    return Business.findOne({
      where: {
        id: businessId
      }
    })
      .then((business) => {
        if (!business) {
          return notFound(res, 'Business');
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

  /**
   * changeBusinessOwnership()
   * @desc changes business ownership to a new user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, user
   */
  static changeBusinessOwnership(req, res) {
    const { businessId } = req.params;

    if (!validator.isUUID(businessId)) {
      return notFound(res, 'Business');
    }

    const ownerId = req.decoded.id;

    return Business.findOne({
      where: {
        id: businessId,
        userId: ownerId
      }
    })
      .then((business) => {
        const { id } = req.foundUser;
        if (ownerId === id) {
          return res.status(200).json({
            message: 'The business is still yours'
          });
        }
        if (business) {
          const { email } = req.body;
          return business.update({ userId: id })
            .then(() => res.status(200).json({
              message: `Business ownership has been transferred to ${email}`
            }));
        }
        return notFound(res, 'Business');
      });
  }

  /**
   * getUserBusinesses()
   * @desc gets the businesses of a logged in user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static getUserBusinesses(req, res) {
    const { id } = req.decoded;

    return Business.all({
      where: {
        userId: id
      }
    })
      .then(businesses => res.status(200).json({
        message: 'Your businesses',
        businesses
      }));
  }
}
