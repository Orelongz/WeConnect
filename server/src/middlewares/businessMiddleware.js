/**
 * businessValidation()
 * @desc handles validation of business input fields
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next Express next middleware function
 * @return {*} error, void
 */
const businessValidation = (req, res, next) => {
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
};

export default businessValidation;
