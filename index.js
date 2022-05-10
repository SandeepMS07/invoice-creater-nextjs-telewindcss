/**
 * Package imports
 */

const express = require("express");
const winston = require("winston");
require("dotenv").config();

const app = express();bas
/**
 * Startup
 */
require("./startup/db")();
//require("./startup/config")(app);
require("./startup/logging")();
require("./startup/protect")(app);
require("./startup/routes")(app);

/**
 * Server
 */

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  winston.info(`Server started at port ${port}`)
);

module.exports = server;
