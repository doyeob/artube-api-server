const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const ApplicationError = require("./src/common/AppicationError");
const DB = require("./src/common/db");

require("dotenv").config();

DB.connect(process.env.DB_URL);

const port = process.env.port || 7000;
const app = express();

app.use(logger("combined"));
app.use(cors());
app.use(express.static("upload"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use("/api/v1/users", require("./src/users/user.controller"));
app.use("/api/v1/images", require("./src/images/image.controller"));
app.use("/api/v1/videos", require("./src/videos/video.controller"));
app.use("/api/v1/links", require("./src/links/link.controller"));
app.post("/github/hook", require("./src/etc/github.controller"));

// error handler
app.use((req, res) => {
  res.status(404).json({ code: "NotFound", message: "Not Found Page" });
});

app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.status).json({ code: err.name, message: err.message });
  } else {
    res.status(500).json({ code: "UncaughtError", message: err.message });
  }
  console.error(err);
});

app.listen(port, () => {
  console.log(`ARTube API Server listening on port ${port}`);
});
