const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoice_number: {
    type: String,
  },
  student_id: {
    type: Schema.Types.ObjectId,
  },
  learncab_id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile_no: {
    type: String,
  },

  created_date: {
    type: Date,
    default: Date.now,
  },

  invoice_date: {
    type: Date,
  },
  total_amount: {
    type: Number,
    default: 0,
  },
  amount_paid: {
    type: Number,
    default: 0,
  },
  taxable_amount: {
    type: Number,
    default: 0,
  },
  payment_id: {
    type: String,
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
      discount: {
        type: String,
      },
      plan_code: {
        type: String,
      },
      days: {
        type: Number,
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
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  download_url: {
    type: String,
  },
});

module.exports = mongoose.model("invoice_details", invoiceSchema);
