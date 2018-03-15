import { db } from './../models';
import { BusinessServices, GenericMessages } from './../middlewares';

const {
  businessObject,
  handleLocationSearch,
  handleCategorySearch
} = BusinessServices;
const { notFound, unauthorized } = GenericMessages;
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

    return Business.create({ ...businessDetails, userId: req.userId })
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
    return Business.findOne({
      where: {
        businessId
      }
    })
      .then((business) => {
        if (!business) {
          notFound(res, 'Business');
        }
        const userId = req.decoded;
        if (userId !== business.userId) {
          unauthorized(res);
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

    return Business.findOne({
      where: {
        businessId
      }
    })
      .then((business) => {
        if (!business) {
          notFound(res, 'Business');
        }
        const userId = req.decoded;
        if (userId !== business.userId) {
          unauthorized(res);
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
          notFound(res, 'Business');
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
