import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import upload from './../middlewares/upload';
import { businessObjectHolder } from './../helpers/business';
import { handleValidation } from './../helpers';

const businessImageUpload = upload.single('businessImage');
const userImageUpload = upload.single('userImage');

dotenv.config();

// cloudinary config
cloudinary.config({
  cloud_name: 'longe',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * uploadBusinessImage()
 * @desc middleware for business image upload
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 * @return {void}
 */
function uploadBusinessImage(req, res, next) {
  businessImageUpload(req, res, (err) => {
    const businessObject = businessObjectHolder(req);
    const validationFailed = handleValidation(res, businessObject);
    if (validationFailed) return validationFailed;

    if (err) {
      return res.status(400).json({
        status: 'fail',
        error: err
      });
    } else if (req.file) {
      cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
        if (error || !result) {
          return next();
        }
        req.body.businessImage = result.secure_url;
        return next();
      });
    } else {
      return next();
    }
  });
}

/**
 * uploadUserImage()
 * @desc middleware for user image upload
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next next object
 * @return {void}
 */
function uploadUserImage(req, res, next) {
  userImageUpload(req, res, (err) => {
    const { firstname, lastname, email } = req.body;
    const validationFailed = handleValidation(res, { firstname, lastname, email });
    if (validationFailed) return validationFailed;

    if (err) {
      return res.status(400).json({
        status: 'fail',
        error: err
      });
    } else if (req.file) {
      cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
        req.body.userImage = result.secure_url;
        next();
      });
    } else {
      next();
    }
  });
}

export {
  uploadBusinessImage,
  uploadUserImage
};
