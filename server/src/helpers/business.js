import validator from 'validator';
import { notFound } from './../helpers/genericMessages';

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
    category,
    address,
    city,
    state,
    phoneNumber,
    about
  };
  return business;
};


/**
 * findBusiness()
 * @desc finds a business by its Id
 * @param {Object} res response object
 * @param {Object} id incoming id
 * @param {Object} str name of model
 * @return {Object} json object
 */
const checkUUID = (res, id, str) => {
  if (!validator.isUUID(id)) {
    return notFound(res, str);
  }
};

export { businessObjectHolder, checkUUID };
