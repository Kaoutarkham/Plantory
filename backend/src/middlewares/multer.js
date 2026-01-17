const multer = require("multer");
const path = require("path");

// 1. Configure where and how to save the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This saves files to the 'uploads' folder in your main 'backend' directory
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    // This gives the file a unique name: timestamp-originalName.jpg
    cb(null, Date.now() + "-" + file.originalname);
  },
});


const upload = multer({ storage: storage });


module.exports = upload;
