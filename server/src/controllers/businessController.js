import Business from './../models/businessModel';

const allBusinesses = [];

/**
 * handleUpdate()
 * @desc handles update of business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} theBusiness
 */
const handleUpdate = (req) => {
  const {
    businessName, businessImage, category, address, city,
    state, phoneNumber, postalAddress, workHours, about
  } = req.body;
  let theBusiness;
  allBusinesses.forEach((business) => {
    if (business.businessId === Number(req.params.businessId)) {
      business.businessName = businessName;
      business.businessImage = businessImage;
      business.category = category;
      business.address = address;
      business.city = city;
      business.state = state;
      business.phoneNumber = phoneNumber;
      business.postalAddress = postalAddress;
      business.workHours = workHours;
      business.about = about;
      business.updatedAt = new Date().toLocaleString();
      theBusiness = business;
    }
  });
  return theBusiness;
};

/**
 * handleUpdate()
 * @desc handles creation new business from model
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} theBusiness
 */
const handleCreate = (req) => {
  const {
    businessName, businessImage, category, address, city,
    state, phoneNumber, postalAddress, workHours, about
  } = req.body;

  const business = new Business({
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
  });
  return business;
};

/**
 * createBusiness()
 * @desc Registers a new business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business
 */
const createBusiness = (req, res) => {
  const { businessName } = req.body;

  let business = allBusinesses.find(eachBusiness => eachBusiness.businessName === businessName);

  if (business) {
    return res.status(409).json({
      message: `${businessName} already exists as a business name`
    });
  }

  business = handleCreate(req);
  allBusinesses.push(business);

  return res.status(201).json({
    message: 'Business successfully created',
    business
  });
};

/**
 * updateBusiness()
 * @desc updates an existing business profile
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business
 */
const updateBusiness = (req, res) => {
  const business = handleUpdate(req);
  if (business) {
    return res.status(200).json({
      message: 'Business successfully updated',
      business
    });
  }
  return res.status(404).json({ message: 'Business not found' });
};

/**
 * deleteBusiness()
 * @desc deletes an existing business profile
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business
 */
const deleteBusiness = (req, res) => {
  let theBusiness;
  allBusinesses.forEach((business, index) => {
    if (business.businessId === Number(req.params.businessId)) {
      theBusiness = business;
      allBusinesses.splice(index, 1);
    }
  });
  if (!theBusiness) {
    return res.status(404).json({
      message: 'Business not found'
    });
  }
  return res.status(200).json({
    message: 'Business was successfully deleted',
    business: theBusiness
  });
};

export { createBusiness, updateBusiness, deleteBusiness, allBusinesses };
