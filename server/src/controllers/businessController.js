import Business from './../models/businessModel';

const allBusinesses = [];

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
 * handleCreate()
 * @desc handles creation new business from model
 * @param {Object} req request object
 * @return {Object} theBusiness
 */
const handleCreate = (req) => {
  const {
    businessName, businessImage, category, address, city,
    state, phoneNumber, postalAddress, workHours, about
  } = req.body;

  const theBusiness = new Business({
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
  return theBusiness;
};

/**
 * handleUpdate()
 * @desc handles update of business
 * @param {Object} req request object
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
 * createBusiness()
 * @desc Registers a new business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business
 */
const createBusiness = (req, res) => {
  const { businessName } = req.body;

  let theBusiness = allBusinesses.find(business => business.businessName === businessName);

  if (theBusiness) {
    return res.status(409).json({
      message: `${businessName} already exists as a business name`
    });
  }

  theBusiness = handleCreate(req);
  allBusinesses.push(theBusiness);

  return res.status(201).json({
    message: 'Business successfully created',
    business: theBusiness
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

/**
 * getBusiness()
 * @desc retrieve the details of a registered business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business
 */
const getBusiness = (req, res) => {
  let theBusiness;
  allBusinesses.forEach((business) => {
    if (business.businessId === Number(req.params.businessId)) {
      theBusiness = business;
    }
  });
  if (!theBusiness) {
    return res.status(404).json({
      message: 'Business not found'
    });
  }
  return res.status(200).json({
    message: 'Business was successfully found',
    business: theBusiness
  });
};

/**
 * getAllBusinesses()
 * @desc retrieve the details of a registered business
 * @param {Object} req request object
 * @param {Object} res response object
 * @return {Object} message, business
 */
const getAllBusinesses = (req, res) => {
  const location = handleLocationSearch(req, allBusinesses);
  const category = handleCategorySearch(req, allBusinesses);
  let theBusinesses;
  if (location || category) {
    theBusinesses = [...(location || []), ...(category || [])];
  }
  if (!theBusinesses) {
    return res.status(200).json({
      message: 'All Businesses',
      business: allBusinesses
    });
  }
  if (theBusinesses.length === 0) {
    return res.status(200).json({
      message: 'There are no businesses with the location'
    });
  }
  return res.status(200).json({
    message: 'Businesses found',
    business: theBusinesses
  });
};

export {
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusiness,
  getAllBusinesses,
  allBusinesses
};
