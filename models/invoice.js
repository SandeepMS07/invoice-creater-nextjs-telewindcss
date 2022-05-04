const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
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
  gdtNo: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  invoice_date: {
    type: Date,
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
});

module.exports = mongoose.model("invoice_details", invoiceSchema);
