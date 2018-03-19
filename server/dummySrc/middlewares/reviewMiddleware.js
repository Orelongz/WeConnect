/**
 * validateReview()
 * @desc handles validation of review input field
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next Express next middleware function
 * @return {*} void
 */
const validateReview = (req, res, next) => {
  const { review } = req.body;
  if (!review || review.trim() === '') {
    return res.status(406).json({
      message: 'The review input field cannot be empty'
    });
  }
  return next();
};

export default validateReview;
