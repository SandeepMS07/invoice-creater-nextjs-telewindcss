/**
 * Varibale declaration
 */

require("express-async-errors");
const winston = require("winston");

// Aync/Await error logs support using express-async-errors

module.exports = function () {
  winston.add(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      timestamp: true,
    }),
    new winston.transports.File({
      filename: "logfile.log",
      timestamp: true,
    })
  );

  winston.exceptions.handle(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      timestamp: true,
    }),
    new winston.transports.File({
      filename: "uncoughtException.log",
      timestamp: true,
    })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
