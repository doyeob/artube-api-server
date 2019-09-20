const mongoose = require("mongoose");

const connect = async dbURL => {
  try {
    await mongoose.connect(dbURL, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
    console.log(`Success to connect to ${dbURL}`);
  } catch (err) {
    throw new Error(`Fail to connect to ${dbURL}`);
  }
};

module.exports = {
  connect
};
