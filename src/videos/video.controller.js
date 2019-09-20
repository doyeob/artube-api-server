const express = require("express");

const router = express.Router();
const videoService = require("./video.service");
const { verifyToken } = require("../common/middlewares/jwt");
const FileUploader = require("../common/middlewares/FileUploader");
const validate = require("../common/middlewares/validate");
const VideoSchema = require("./video.schema");
const { NoVideoFile } = require("./video.errors");

async function create(req, res, next) {
  try {
    if (!req.file) {
      throw new NoVideoFile();
    }

    const videoParam = {
      userId: req.user.id,
      filename: req.file.filename,
      ...req.body
    };
    const video = await videoService.create(videoParam);
    res.json(video);
  } catch (err) {
    next(err);
  }
}

async function getByUserId(req, res, next) {
  try {
    const videos = await videoService.getByUserId(req.user.id);
    res.json(videos);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const video = await videoService.getById(req.params.id);
    res.json(video);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const videoParam = {
      ...req.body,
      updatedAt: Date.now()
    };

    if (req.file) {
      videoParam.filename = req.file.filename;
    }

    const updatedVideo = await videoService.update(req.params.id, videoParam);
    res.json(updatedVideo);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await videoService.remove(req.params.id);
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
  FileUploader.uploadVideo,
  validate(VideoSchema.create),
  create
);
router.put("/:id", verifyToken, FileUploader.uploadVideo, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
