const fs = require("fs").promises;
const Image = require("./image.model");
const { ImageNotFound } = require("./image.errors");

async function getByUserId(userId) {
  return await Image.find({ userId });
}

async function getById(id) {
  const image = await Image.findById(id);

  if (!image) throw new ImageNotFound();

  return image;
}

async function create(imgParam) {
  const image = new Image(imgParam);
  return await image.save();
}

async function update(id, imgParam) {
  const image = await Image.findById(id);

  if (!image) throw new ImageNotFound();

  if (imgParam.filename) {
    await fs.unlink(`upload/images/${image.filename}`);
  }

  Object.assign(image, imgParam);

  return await image.save();
}

async function remove(id) {
  const image = await Image.findById(id);

  if (!image) throw new ImageNotFound();

  await fs.unlink(`upload/images/${image.filename}`);
  await Image.findByIdAndRemove(id);
}

module.exports = {
  getByUserId,
  getById,
  create,
  update,
  remove
};
