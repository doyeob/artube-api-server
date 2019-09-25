// const http = require("http");
const crypto = require("crypto");
const path = require("path");
const { exec } = require("child_process");

const REPO = path.dirname(require.main.filename || process.mainModule.filename);

module.exports = (req, res) => {
  const SECRET_TOKEN = "BAv66g9jU.AcW-jkAA*2jnb";
  const signature = `sha1=${crypto
    .createHmac("sha1", SECRET_TOKEN)
    .update(JSON.stringify(req.body))
    .digest("hex")}`;

  const isValid = signature === req.headers["x-hub-signature"];

  if (isValid) {
    console.log(`Start hooking from remote repo to ${REPO}`);
    res.status(200).end("Authorized");
    exec(`cd ${REPO} && git pull && npm install`);
  } else {
    console.log("Fail to hook from remote repo");
    res.status(403).send("Permission Denied");
  }
};
