/** Package imports */
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const https = require("https");
const mongoose = require("mongoose");
const fetch = require("cross-fetch");
const nodemailer = require("nodemailer");
const _ = require("lodash");

/** Models */
const { Router } = require("express");
const Invoice = require("../../models/invoice");
const InvoiceInc = require("../../models/invoice_inc");

/** Helpers */

const { generateInvoice } = require("./generateInvoice");

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  newPipeline,
} = require("@azure/storage-blob");

/**
 * Helpers
 */

const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage });

const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const ONE_MINUTE = 60 * 1000;

const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);
const pipeline = newPipeline(sharedKeyCredential);

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

/**
 *  File upload
 */

/***************** API routes *****************/

router.post("/generateInvoice", async (req, res) => {
  let {
    name,
    email,
    phone,
    student_id,
    learncab_id,
    address,
    city,
    state,
    pincode,
    country,
    download_url,
    payment_id,
    price,
    items,
    amount_paid,
    invoice_date,
    plan_code,
    days,
    discount,
    date,
  } = req.body;

  let gst_number = req.body.gst_number ? req.body.gst_number : "";

  //let discountV = discount;
  let description;

  const getSeqNo = await InvoiceInc.findOneAndUpdate(
    { _id: "invno" },
    { $inc: { seq: 1 } },
    { new: true }
  );

  const seqNo = getSeqNo.seq;
  let u = new Date();
  let iYear = Number(u.getFullYear().toString().substr(2));
  let iMonth = u.getMonth() + 1;
  iMonth = iMonth >= 10 ? iMonth : `0${iMonth}`;
  const invoice_number = "INV" + iYear + iMonth + "SN" + seqNo;

  // GET Total Amount Paid (all purchases
  let totalAmount = items.reduce((acc, elem) => acc + elem.amount_paid, 0);

  // GET Total Price
  let totalPrice = items.reduce((acc, elem) => acc + elem.price, 0);

  let tax = {};
  let taxAmount = {};

  // Calculate Tax to be paid for grand total
  const taxValue = Math.floor(totalAmount - (totalAmount * 100) / 118);
  console.log(taxValue);

  // Calculate Taxable amount
  const taxableAmount = totalAmount - taxValue;
  console.log(taxableAmount);

  // If state is Karnataka divide GST into CGST, SGST

  if (state === "Karnataka" || state == "karnataka") {
    taxAmount.CGST = taxAmount.SGST = Math.floor(taxValue / 2);
    console.log(taxAmount.CGST);
    console.log(taxAmount.SGST);
    tax.CGST = 9;
    tax.SGST = 9;
    tax.GST = 0;
  }

  // If state is not Karnataka send GST into IGST
  else {
    taxAmount.GST = taxValue;
    console.log(taxAmount.GST);
    tax.CGST = 0;
    tax.SGST = 0;
    tax.GST = 18;
  }

  const invoice = {
    billing: {
      name: _.startCase(_.toLower(name)),
      address: _.startCase(_.toLower(address)),
      city: _.startCase(_.toLower(city)),
      state: _.startCase(_.toLower(state)),
      country: _.startCase(_.toLower(country)),
      postal_code: pincode,
    },
    customer: {
      name: _.startCase(_.toLower(name)),
      phone: phone,
      email: email,
      learncab_id: learncab_id,
      gst_number: gst_number,
    },
    items: items,

    taxable: taxableAmount,

    tax: tax,
    taxAmount: taxAmount,
    total: totalAmount,
    payment_id: payment_id,
    invoice_nr: invoice_number,
    date: date,
  };
  // console.log(invoice.taxable);

  //const identifier = Math.random().toString().replace(/0\./, ""); // remove "0." from start of string
  const identifier = Math.floor(Math.random() * 899999 + 100000); // remove "0." from start of string
  console.log(identifier);

  let filename = `${identifier}${invoice_number}.pdf`;

  const fileurl = await generateInvoice(invoice, filename);
  console.log(fileurl);

  //sendMessage(name, email, fileurl);

  function sendMessage(name, email, url) {
    const smtpTransport = nodemailer.createTransport({
      host: "mail.learncab.com",
      // host: "bv-b13.yuvanetworks.in",
      port: 587,
      // secure : true,
      auth: {
        user: "noreply@learncab.com",
        pass: "$Le@rnCab123#",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      to: `${email}`,
      subject: `LearnCab Invoice`,
      html: `<p>Dear ${name}
				</p><p>Thank you for your order! Your payment has been successfully processed and your package should be active now!
				
	
	
				
        </p><p>Following your successful payment, please download invoice from the link below. We recommend you keep this for future reference. 
        <br/>
        <br/>

        <button style="background-color:#0080ff; border:0; height:40px; width:150px; border-radius:4px; font-weight:bold; font-size:14px">
        <a style="color:white; text-decoration:none" href="${fileurl}" download="${fileurl}">Download Invoice</a>
        </button>
				<br/>
        <br/>
        </p><p>Regards,<br/>LearnCab Team</p>`,
    };

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        count = count + 1;

        if (count <= 2) {
          sendMessage(name, email, file);
        } else {
          console.log("error");
        }
      } else {
        console.log("Message sent: " + email + "");
      }
    });
  }

  //console.log(doc);
  /**
   *  SAVE TO MONGODB
   *
   */

  const datel = new Date();
  let ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes
  offset = ISToffSet * 60 * 1000;
  const invdate = new Date(datel + offset);

  console.log(invdate);

  const newInvoice = new Invoice({
    invoice_number: invoice_number,
    name: name,
    email: email,
    student_id: student_id,
    learncab_id: learncab_id,
    mobile_no: phone,
    total_amount: totalPrice,
    amount_paid: taxableAmount,
    taxable_amount: taxableAmount,
    items: items,
    SGST: taxAmount.SGST,
    CGST: taxAmount.CGST,
    IGST: taxAmount.GST,
    city: city,
    state: state,
    pincode: pincode,
    download_url: fileurl,
    invoice_date: invdate,
    payment_id: payment_id,
  });

  let datakr = await newInvoice.save();
  if (!fileurl) {
    console.log("pdf created");
  }

  res.json({ result: "Invoice created successfully", fileurl });
});

module.exports = router;
