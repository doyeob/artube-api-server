const express = require("express");

const router = express.Router();
const imgService = require("./image.service");
const { verifyToken } = require("../common/middlewares/jwt");
const FileUploader = require("../common/middlewares/FileUploader");
const validate = require("../common/middlewares/validate");
const ImageSchema = require("./image.schema");
const { NoImageFile } = require("./image.errors");

async function create(req, res, next) {
  try {
    if (!req.file) {
      throw new NoImageFile();
    }

    const imgParam = {
      userId: req.user.id,
      filename: req.file.filename,
      ...req.body
    };

    const image = await imgService.create(imgParam);

    res.json(image);
  } catch (err) {
    next(err);
  }
}

async function getByUserId(req, res, next) {
  try {
    const images = await imgService.getByUserId(req.user.id);
    res.json(images);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const image = await imgService.getById(req.params.id);
    res.json(image);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const imgParam = {
      ...req.body,
      updatedAt: Date.now()
    };

    if (req.file) {
      imgParam.filename = req.file.filename;
    }

    const updatedImage = await imgService.update(req.params.id, imgParam);
    res.json(updatedImage);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await imgService.remove(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
}

// routes
router.get("/", verifyToken, getByUserId);
router.get("/:id", verifyToken, getById);
router.post(
  "/",
  verifyToken,
  FileUploader.uploadImage,
  validate(ImageSchema.create),
  create
);
router.put("/:id", verifyToken, FileUploader.uploadImage, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
