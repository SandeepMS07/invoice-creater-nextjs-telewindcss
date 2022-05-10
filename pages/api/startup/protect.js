/**
 * Variable Declarations
 */

const helmet = require("helmet");
const compression = require("compression");

/**
 *  Helmet helps to secure app by setting various HTTP headers.
 *  'compression' is Node.js compression middleware.
 */

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};
