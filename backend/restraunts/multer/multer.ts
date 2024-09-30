import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.params.type; // Get type from request parameters
    let dirPath;

    if (type === "restaurant") {
      dirPath = path.join(process.cwd(), "public/Restraunt"); // Correct folder
    } else if (type === "hotel") {
      dirPath = path.join(process.cwd(), "public/Restraunt/hotels"); // Correct folder
    } else {
      return cb(
        new Error('Invalid type. Must be "restaurant" or "hotel".'),
        ""
      ); // Error handling
    }

    cb(null, dirPath); // Set the destination path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Set the filename
  },
});

const upload = multer({ storage: storage });

export { upload };
