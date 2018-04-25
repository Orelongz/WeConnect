import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './../../../client/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  }
});
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpe?g|png|gif)/i)) {
    return cb(new Error('Only image files are allowed'));
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 1000000 },
}).single('businssImage');

/**
 * @desc middleware for image upload
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {*} void
 */
function ImageUpload(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      req.file = '';
    }
    req.file = '';
    return next();
  });
}

export default ImageUpload;
