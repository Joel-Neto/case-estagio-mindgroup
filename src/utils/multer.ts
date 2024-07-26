import multer from "multer";
import path from "path";

// Configuração do Multer
const storage = multer.diskStorage({
  destination(req, file, callback) {
    const uploadDirectory = path.join(__dirname, "..", "uploads");
    callback(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
export default upload;
