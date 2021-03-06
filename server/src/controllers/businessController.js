import db from './../models';
import {
  businessObjectHolder,
  handleBusinessSearch
} from './../helpers/business';
import {
  notFound,
  checkUUID,
  unauthorized,
  handleValidation,
  handleErrorMessage
} from './../helpers';

const { Business, User, Category } = db;

/**
 * @class BusinessController
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
    const businessObject = businessObjectHolder(req);
    const { postalAddress, category, businessImage } = req.body;

    return Category.findOne({ where: { category } })
      .then((theCategory) => {
        if (!theCategory) {
          return res.status(400).json({
            status: 'fail',
            error: 'Category is invalid'
          });
        }
        const { id: userId } = req.decoded;
        const { id: categoryId } = theCategory;

        return Business.create({
          ...businessObject, userId, businessImage, postalAddress, categoryId
        })
          .then(business => res.status(201).json({
            status: 'success',
            data: { business }
          }));
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * updateBusiness()
   * @desc updates an existing business profile
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static updateBusiness(req, res) {
    const businessObject = businessObjectHolder(req);
    const { postalAddress, category, businessImage } = req.body;

    return Category.findOne({ where: { category } })
      .then((theCategory) => {
        if (!theCategory) {
          return res.status(400).json({
            status: 'fail',
            error: 'Category is invalid'
          });
        }
        const { id: userId } = req.decoded;
        const { id: categoryId } = theCategory;
        const { businessId: id } = req.params;
        const isNotUUID = checkUUID(res, id, 'Business');
        if (isNotUUID) return isNotUUID;

        return Business.update(
          {
            ...businessObject, businessImage, postalAddress, categoryId
          },
          {
            where: { id, userId },
            returning: true,
            plain: true
          }
        )
          .then(business => res.status(200).json({
            status: 'success',
            data: { business: business[1] }
          }));
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * deleteBusiness()
   * @desc deletes an existing business profile
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static deleteBusiness(req, res) {
    const { businessId: id } = req.params;
    const isNotUUID = checkUUID(res, id, 'Business');

    if (isNotUUID) return isNotUUID;

    const { id: userId } = req.decoded;

    return Business.destroy({
      where: { id, userId }
    })
      .then((result) => {
        if (result === 1) {
          return res.status(200).json({
            status: 'success',
            message: 'Business deleted'
          });
        }
        return unauthorized(res);
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * getBusiness()
   * @desc retrieve the details of a registered business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static getBusiness(req, res) {
    const { businessId: id } = req.params;
    const isNotUUID = checkUUID(res, id, 'Business');

    if (isNotUUID) return isNotUUID;

    return Business.findOne({
      where: { id }
    })
      .then((business) => {
        if (!business) {
          return notFound(res, 'Business');
        }
        return res.status(200).json({
          status: 'success',
          data: { business }
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * getAllBusinesses()
   * @desc retrieve the details of a registered business
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, businesses
   */
  static getAllBusinesses(req, res) {
    const databaseQuery = handleBusinessSearch(req);

    const limit = 6;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);

    return Business
      .findAndCountAll({
        limit,
        ...databaseQuery,
        offset,
        order: [['createdAt', 'DESC']]
      })
      .then((businesses) => {
        const { count } = businesses;
        const pages = Math.ceil(count / limit);
        const currentPage = Math.floor(offset / limit) + 1;

        return res.status(200).json({
          status: 'success',
          data: {
            businesses: businesses.rows,
            paginate: {
              count,
              pages,
              currentPage,
              pageSize: businesses.rows.length,
              limit
            }
          }
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
    const { email } = req.body;
    const validationFailed = handleValidation(res, { email });
    if (validationFailed) return validationFailed;

    const { businessId: id } = req.params;
    const isNotUUID = checkUUID(res, id, 'Business');
    if (isNotUUID) return isNotUUID;

    const { id: ownerId } = req.decoded;

    return User.findOne({
      where: { email }
    })
      .then((user) => {
        if (!user) {
          return notFound(res, 'User');
        }
        const { id: userId } = user;
        return Business.update(
          { userId },
          { where: { id, userId: ownerId }, returning: true, plain: true }
        )
          .then((business) => {
            if (business) {
              return res.status(200).json({
                status: 'success',
                data: {
                  message: 'Business transferred',
                  business: business[1]
                }
              });
            }
          });
      })
      .catch(error => handleErrorMessage(res, error));
  }

  /**
   * getUserBusinesses()
   * @desc gets the businesses of a logged in user
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} message, business
   */
  static getUserBusinesses(req, res) {
    const { id: userId } = req.decoded;
    const limit = req.query.limit || 9;
    const page = req.query.page || 1;
    const offset = limit * (page - 1);

    return Business.findAndCountAll({
      where: { userId },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })
      .then((businesses) => {
        const { count } = businesses;
        const pages = Math.ceil(count / limit);
        const currentPage = Math.floor(offset / limit) + 1;

        return res.status(200).json({
          status: 'success',
          data: {
            businesses: businesses.rows,
            paginate: {
              count,
              pages,
              currentPage,
              pageSize: businesses.rows.length
            }
          }
        });
      })
      .catch(error => handleErrorMessage(res, error));
  }
}
