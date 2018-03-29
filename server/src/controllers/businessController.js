import { db } from './../models';
import BusinessServices from './../services/BusinessService';
import { unauthorized } from './../services/genericMessages';

const { Business } = db;
const {
  businessObject,
  handleLocationSearch,
  handleCategorySearch
} = BusinessServices;

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
        business
      }))
      .catch(error => res.status(500).json({ error }));
  }

  /**
   * updateBusiness()
   * @desc updates an existing business profile
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static updateBusiness(req, res) {
    const business = req.foundBusiness;
    const { id } = req.decoded;

    if (id !== business.userId) {
      return unauthorized(res);
    }
    const update = businessObject(req);
    return business.update({ ...update })
      .then(() => res.status(200).json({
        message: 'Update successful',
        business
      }))
      .catch(error => res.status(500).json({ error }));
  }

  /**
   * deleteBusiness()
   * @desc deletes an existing business profile
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static deleteBusiness(req, res) {
    const business = req.foundBusiness;
    const { id } = req.decoded;

    if (id !== business.userId) {
      return unauthorized(res);
    }

    return business.destroy()
      .then(() => res.status(200).json({
        message: 'Delete successful'
      }))
      .catch(error => res.status(500).json({ error }));
  }

  /**
   * getBusiness()
   * @desc retrieve the details of a registered business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static getBusiness(req, res) {
    const business = req.foundBusiness;

    return res.status(200).json({
      business
    });
  }

  /**
   * getAllBusinesses()
   * @desc retrieve the details of a registered business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, businesses
   */
  static getAllBusinesses(req, res) {
    return Business.all()
      .then((businesses) => {
        const location = handleLocationSearch(req, businesses);
        const category = handleCategorySearch(req, businesses);
        if (!location && !category) {
          if (businesses.length === 0) {
            return res.status(200).json({
              message: 'No businesses found'
            });
          }
          return res.status(200).json({
            businesses
          });
        }
        const theBusinesses = [...(location || []), ...(category || [])];

        if (theBusinesses.length === 0) {
          return res.status(200).json({
            message: 'No businesses found'
          });
        }
        return res.status(200).json({
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
    const business = req.foundBusiness;
    const ownerId = req.decoded.id;

    if (business.userId === ownerId) {
      const { id } = req.foundUser;
      const { email } = req.body;
      return business.update({ userId: id })
        .then(() => res.status(200).json({
          message: `Business ownership transferred to ${email}`
        }))
        .catch(error => res.status(500).json({ error }));
    }
    return unauthorized(res);
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
        businesses
      }))
      .catch(error => res.status(500).json({ error }));
  }
}
