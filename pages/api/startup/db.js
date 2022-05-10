/**
 * Variable Declaration
 */

const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

/**
 * MongoDb Connection
 * Pass value for "MONGO_URL_1" [Environment variable]
 */

module.exports = async () => {
  const dbName = "learncab";
  const options = "?retryWrites=true&w=majority";

  // Production connection string
  const db = process.env.MONGO_URL_2 + "/" + dbName + options;
  try {
    const conn = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    winston.info(`Mongo DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
