const express = require("express");
const Joi = require("joi");

const router = express.Router();
const userService = require("./user.service");
const { verifyToken } = require("../common/middlewares/jwt");
const FileUploader = require("../common/middlewares/FileUploader");
const validate = require("../common/middlewares/validate");
const UserSchema = require("./user.schema");

async function authenticate(req, res, next) {
  try {
    const user = await userService.authenticate(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function register(req, res, next) {
  try {
    const userParam = {
      profileImageFilename: req.file ? req.file.filename : "",
      ...req.body
    };
    const user = await userService.create(userParam);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function getCurrent(req, res, next) {
  try {
    const user = await userService.getById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const userParam = {
      ...req.body,
      updatedAt: Date.now()
    };

    const updatedUser = await userService.update(req.params.id, userParam);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await userService.remove(req.params.id);
    res.json({});
  } catch (err) {
    next(err);
  }
}

// routes
router.post("/authenticate", validate(UserSchema.auth), authenticate);
router.post(
  "/register",
  FileUploader.uploadImage,
  validate(UserSchema.create),
  register
);
router.get("/current", verifyToken, getCurrent);
router.get("/:id", verifyToken, getById);
router.put("/:id", verifyToken, update);
router.delete("/:id", verifyToken, remove);

module.exports = router;
