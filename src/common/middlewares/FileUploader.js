const fs = require("fs");
const uuidv1 = require("uuid/v1");
const multer = require("multer");
const ApplicationError = require("../AppicationError");

class InvalidOptions extends ApplicationError {
  constructor(message) {
    super(message || "The request is invalid", 400);
  }
}

class UnsupportedMimeType extends ApplicationError {
  constructor(message) {
    super(message || "UnsupportedMimeType", 400);
  }
}

const createDirectory = (path, cb) => {
  fs.access(path, fs.constants.F_OK, err => {
    if (err) {
      fs.mkdir(path, { recursive: true }, () => {
        cb(null, path);
      });
    } else {
      cb(null, path);
    }
  });
};

const FileUploader = options => {
  if (!options) {
    throw new InvalidOptions("FileUploader constructor error");
  } else if (!options.path || typeof options.path !== "string") {
    throw new InvalidOptions("options.path should be string");
  } else if (!options.mimeTypes || !Array.isArray(options.mimeTypes)) {
    throw new InvalidOptions("options.path should be array");
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      createDirectory(options.path, cb);
    },
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const fileName = `${uuidv1()}.${fileExt}`;
      cb(null, fileName);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (options.mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new UnsupportedMimeType(
          `${
            file.mimetype
          } mimetype isn't supported. Supported mimetypes are ${options.mimeTypes.join(
            ", "
          )}`
        )
      );
    }
  };

  const fileUploader = multer({ storage, fileFilter }).single("file");

  const uploader = (req, res, next) => {
    fileUploader(req, res, err => {
      if (err) {
        next(err);
      } else {
        next();
      }
    });
  };

  return uploader;
};

const uploadVideo = FileUploader({
  path: "upload/videos",
  mimeTypes: ["video/mp4", "video/quicktime"]
});

const uploadImage = FileUploader({
  path: "upload/images",
  mimeTypes: ["image/png", "image/jpeg"]
});

module.exports = {
  uploadVideo,
  uploadImage
};
