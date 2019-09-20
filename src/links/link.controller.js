const express = require("express");

const router = express.Router();
const linkService = require("./link.service");
const imageService = require("../images/image.service");
const videoService = require("../videos/video.service");
const { verifyToken } = require("../common/middlewares/jwt");
const validate = require("../common/middlewares/validate");
const LinkSchema = require("./link.schema");
const { ImageNotFound, VideoNotFound } = require("./link.errors");

async function create(req, res, next) {
  try {
    const image = await imageService.getById(req.body.image);
    if (!image) throw new ImageNotFound();

    const video = await videoService.getById(req.body.video);
    if (!video) throw new VideoNotFound();

    const linkParam = {
      userId: req.user.id,
      ...req.body
    };

    const link = await linkService.create(linkParam);
    res.json(link);
  } catch (err) {
    next(err);
  }
}

async function getByUserId(req, res, next) {
  try {
    const links = await linkService.getByUserId(req.user.id);
    res.json(links);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const link = await linkService.getById(req.params.id);
    res.json(link);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    await linkService.update(req.params.id, req.body);
    res.json({});
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await linkService.remove(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
}

// routes
router.get("/", verifyToken, getByUserId);
router.get("/:id", verifyToken, getById);
router.post("/", verifyToken, validate(LinkSchema.create), create);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
