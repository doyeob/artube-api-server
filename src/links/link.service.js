const Link = require("./link.model");
const { LinkNotFound } = require("./link.errors");

async function getByUserId(userId) {
  return await Link.find({ userId })
    .populate("image", "-userId")
    .populate("video", "-userId");
}

async function getById(id) {
  const link = await Link.findById(id)
    .populate("image", "-userId")
    .populate("video", "-userId");

  if (!link) throw new LinkNotFound();

  return link;
}

async function create(linkParam) {
  const link = new Link(linkParam);
  return await link.save();
}

async function update(id, linkParam) {
  const link = await Link.findById(id);

  if (!link) throw new LinkNotFound();

  Object.assign(link, linkParam);

  await link.save();
}

async function remove(id) {
  await Link.findByIdAndRemove(id);
}

module.exports = {
  getByUserId,
  getById,
  create,
  update,
  remove
};
