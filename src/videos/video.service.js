const fs = require("fs").promises;
const { exec } = require("child_process");
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
  await exec(
    `ffmpeg -ss 00:00:01.01 -i upload/videos/${videoParam.filename} -s 160*120 -t 0.1 upload/videos/${videoParam.filename}.jpg`
  );
  return await video.save();
}

async function update(id, videoParam) {
  const video = await Video.findById(id);

  if (!video) throw new VideoNotFound();

  if (videoParam.filename) {
    try {
      await fs.unlink(`upload/videos/${video.filename}`);
      await fs.unlink(`upload/videos/${video.filename}.jpg`);
    } catch (e) {
      /* 무시함. */
    }
  }

  await exec(
    `ffmpeg -ss 00:00:01.01 -i upload/videos/${videoParam.filename} -s 160*120 -t 0.1 upload/videos/${videoParam.filename}.jpg`
  );
  Object.assign(video, videoParam);

  return await video.save();
}

async function remove(id) {
  const video = await Video.findById(id);

  if (!video) throw new VideoNotFound();

  try {
    await fs.unlink(`upload/videos/${video.filename}`);
    await fs.unlink(`upload/videos/${video.filename}.jpg`);
  } catch (e) {
    /* 무시함. */
  }
  await Video.findByIdAndRemove(id);
}

module.exports = {
  getByUserId,
  getById,
  create,
  update,
  remove
};
