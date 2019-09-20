const fs = require("fs").promises;
const Video = require("./video.model");
const { VideoNotFound } = require("./video.errors");

async function getByUserId(userId) {
  return await Video.find({ userId });
}

async function getById(id) {
  const video = await Video.findById(id);

  if (!video) throw new VideoNotFound();

  return video;
}

async function create(videoParam) {
  const video = new Video(videoParam);
  return await video.save();
}

async function update(id, videoParam) {
  const video = await Video.findById(id);

  if (!video) throw new VideoNotFound();

  if (videoParam.filename) {
    await fs.unlink(`upload/videos/${video.filename}`);
  }

  Object.assign(video, videoParam);

  return await video.save();
}

async function remove(id) {
  const video = await Video.findById(id);

  if (!video) throw new VideoNotFound();

  await fs.unlink(`upload/videos/${video.filename}`);
  await Video.findByIdAndRemove(id);
}

module.exports = {
  getByUserId,
  getById,
  create,
  update,
  remove
};
