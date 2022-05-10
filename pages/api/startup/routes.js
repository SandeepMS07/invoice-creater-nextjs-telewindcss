/**
 * All Endpoints
 */

/** Package imports */
const express = require("express");

/** Routes */

const invoice = require("../routes/invoice/invoice");

/** Endpoint Exports */

module.exports = function (app) {
  app.use(express.json());

  app.use("/invoy/api/v1/invoice", invoice);

};
