const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const { Schema } = mongoose;

const schema = new Schema({
  userId: { type: ObjectId, required: true },
  filename: { type: String, required: true, unique: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  phyWidth: { type: Number, required: true },
  phyHeight: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Image", schema);
