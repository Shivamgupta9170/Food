const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File name will be unique timestamp + original file name
  }
});

// Initialize multer upload
const upload = multer({ storage: storage });

module.exports = upload;

