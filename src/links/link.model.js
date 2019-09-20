const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const schema = new Schema({
  userId: { type: ObjectId, required: true },
  image: { type: ObjectId, ref: "Image", required: true },
  video: { type: ObjectId, ref: "Video", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", schema);
