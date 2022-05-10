// const mongoose = require("mongoose");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoice_number: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  student_id: {
    type: Schema.Types.ObjectId,
  },
  learncab_id: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  country: {
    type: String,
  },
  gst_number: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  invoice_date: {
    type: Date,
  },
  total_amount: {
    type: Number,
    default: 0,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  amount_paid: {
    type: Number,
    default: 0,
  },
  taxable_amount: {
    type: Number,
    default: 0,
  },
  items: [
    {
      description: {
        type: String,
      },
      price: {
        type: String,
      },
      amount_paid: {
        type: String,
      },
      plan_code: {
        type: String,
      },
      days: {
        type: Number,
      },
      discount: {
        type: String,
      },
    },
  ],
  SGST: {
    type: Number,
    default: 0,
  },
  IGST: {
    type: Number,
    default: 0,
  },
  CGST: {
    type: Number,
    default: 0,
  },
  download_url: {
    type: String,
  },
});

// module.exports = mongoose.model("invoice_details", invoiceSchema);
export default mongoose.models.invoice_details || mongoose.model("invoice_details", invoiceSchema)
