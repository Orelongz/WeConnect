import multer from 'multer';
import shortid from 'shortid';

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, './client/public/uploads');
  // },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${shortid.generate()}.${file.mimetype.split('/')[1]}`);
  }
});

const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpe?g|png|gif)/i)) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const ImageUpload = multer({
  storage,
  fileFilter: imageFilter
});

export default ImageUpload;
