// const mongoose = require("mongoose");
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceInc = new Schema({
  _id: {
    type: String,
    default: "invno",
  },
  seq: {
    type: Number,
  },
});

// module.exports = mongoose.model("invoice_inc", invoiceInc);
export default mongoose.model("invoice_inc", invoiceInc)

