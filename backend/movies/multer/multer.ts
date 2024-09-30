import fs from "fs";
import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = path.join(process.cwd(), "public/Movies"); // Use process.cwd() to reference the project root

    // Check if directory exists, if not, create it
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // Ensure all parent folders are created
    }

    cb(null, dirPath); // Correct destination folder for uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save the file with its original name
  },
});

// Initialize multer with the storage engine
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 100 }, // 100MB
});

export default upload;
