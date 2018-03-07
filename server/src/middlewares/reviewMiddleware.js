
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
