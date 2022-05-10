/**
 *  Package imports
 *
 */

const fs = require("fs");
const PDFDocument = require("pdfkit");
const doc = require("pdfkit");
const path = require("path");
const { resolve } = require("path");

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

// const fontMedium = "D:/Projects/invoy/assets/fonts/RedHatDisplay-Medium.ttf";
// const fontRegular = "D:/Projects/invoy/assets/fonts/RedHatDisplay-Regular.ttf";
// const fontBold = "D:/Projects/invoy/assets/fonts/RedHatDisplay-Bold.ttf";
const fontMedium = path.join(
  __dirname + "../../../assets/fonts/RedHatDisplay-Medium.ttf"
);
const fontRegular = path.join(
  __dirname + "../../../assets/fonts/RedHatDisplay-Regular.ttf"
);
const fontBold = path.join(
  __dirname + "../../../assets/fonts/RedHatDisplay-Bold.ttf"
);
/**
 *
 *  Generate Invoice
 */

async function generateInvoice(invoice, filename) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateTaxableAmount(doc, invoice);
  generateTaxPosition(doc, invoice);
  generateGrandTotal(doc, invoice);
  generatePaidImage(doc);
  generateFooter(doc);

  let buffers = [];
  doc.on("data", buffers.push.bind(buffers));
  const containerName = "nl-files-uploads";
  const containerClient = blobServiceClient.getContainerClient(containerName);
  blockBlobClient = containerClient.getBlockBlobClient(
    //`${"invoices"}/${filename}`
    `${"invoices-test"}/${filename}`
  );
  blockBlobClient.uploadStream(
    doc.on("end", () => {
      Buffer.concat(buffers);
    }),
    uploadOptions.bufferSize,
    uploadOptions.maxBuffers,
    { blobHTTPHeaders: { blobContentType: "application/pdf" } }
  );

  const fileurl = await blockBlobClient.url;
  console.log(fileurl);
  doc.end();
  return fileurl;
}

function generateHeader(doc, invoice) {
  doc
    //LOGO
    .image(
      path.join(__dirname + "../../../assets/images/logoblue.png"),
      50,
      30,
      {
        width: 140,
      }
    )
    // BACKGROUND FILL COLOUR
    .fillColor("#ffffff")

    // INVOICE HEADING
    .fillColor("#9dceff")
    .font(fontBold)
    .fontSize(36)
    .text("INVOICE", 50, 30, { align: "right" })

    .rect(0, 90, 700, 25)
    .fill("#0080ff")
    .rect(0, 110, 700, 155)
    .fill("#ebf5ff")

    // DATE
    .fillColor("#ffffff")
    .font(fontBold)
    .fontSize(10)
    .text(`Date: ${formatDate(new Date(invoice.date))}`, 50, 94, {
      align: "left",
    })

    // INV NO
    .fillColor("#ffffff")
    .font(fontBold)
    .fontSize(10)
    .text(`Invoice No: ${invoice.invoice_nr} `, 300, 94, { align: "right" })

    // COMPANY DETAILS
    .fillColor("#0080ff")
    .font(fontBold)
    .fontSize(12)
    .text("Company Details", 50, 120, { align: "left" })
    .fillColor("#555555")
    .font(fontBold)
    .fontSize(12)
    .text("Nulurn Edutech Private Limited", 50, 140, { align: "left" })
    .fontSize(9)
    .text("CIN: U80300KA2017PTC105610", 50, 157, { align: "left" })
    .text("GSTIN: 29AAFCN7454F1Z6", 50, 168, { align: "left" })
    .font(fontRegular)
    .fillColor("#555555")
    .fontSize(9)
    .text("No.3,Sri Sai Square,3rd Floor", 50, 183, { align: "left" })
    .text("Outer Ring Road,", 50, 195, { align: "left" })
    .text("2nd Stage,Nagarabhavi,", 50, 207, { align: "left" })
    .text("Bengaluru,560072 Karnataka", 50, 219, { align: "left" })
    .text("Contact: 080-43691464", 50, 235, { align: "left" })
    .text("Email: support@learncab.com", 50, 245, { align: "left" })

    // CUSTOMER DETAILS
    .fillColor("#0080ff")
    .font(fontBold)
    .fontSize(12)
    .text("Customer Details", 300, 120, { align: "left" })
    .fillColor("#555555")
    .fontSize(9)
    .text(`LearnCab ID: ${invoice.customer.learncab_id}`, 300, 140, {
      align: "left",
    })
    .fontSize(9)
    .text(`Phone: ${invoice.customer.phone}`, 450, 140, { align: "left" })
    .fontSize(9)
    .text(`Name/Business: ${invoice.customer.name}`, 300, 155, {
      align: "left",
    })
    .fontSize(9)
    .text(`Email: ${invoice.customer.email}`, 300, 170, { align: "left" })
    .fontSize(9)
    .text("Address:", 300, 185, { align: "left" })
    .font(fontRegular)
    .fontSize(9)
    .text(
      invoice.billing.address +
        ", " +
        invoice.billing.city +
        ", " +
        invoice.billing.state +
        ", " +
        invoice.billing.country +
        ". " +
        invoice.billing.postal_code,
      300,
      200,
      { align: "left" }
    )
    .font(fontBold)
    .fontSize(10)
    .text(`Payment ID:`, 300, 230, { align: "left" })
    .font(fontRegular)
    .fontSize(10)
    .text(`${invoice.payment_id} `, 360, 230)
    .font(fontBold)
    .fontSize(9)
    .text(
      `GSTIN: ${
        invoice.customer.gst_number != ""
          ? `${invoice.customer.gst_number}`
          : "N/A"
      }`,
      300,
      246,
      { align: "left" }
    )
    .moveDown();
}

/**
 *  Purchase table
 */

let positionSub = 0;

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 290;

  doc.font(fontBold);

  // GENERATE TABLE HEADING
  generateTableRow(
    doc,
    invoiceTableTop,
    //"Package",
    "HSN/SAC",
    "Item Description",
    "Amount",
    "Discount",
    "Total"
  );

  generateHL(doc, invoiceTableTop + 20);
  doc.font(fontRegular).fontSize(12);

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;

    generateTableRow(
      doc,
      position,
      //item.package,
      "999293",
      item.description,
      `${
        "Rs " +
        // new Intl.NumberFormat("en-IN", {
        //   maximumSignificantDigits: 3,
        // }).format
        item.price
      }`,
      item.discount,
      `${
        "Rs " +
        // new Intl.NumberFormat("en-IN", {
        //   maximumSignificantDigits: 3,
        // })
        item.amount_paid
      }`
    );

    generateHL2(doc, position + 20);
  }
}

// TAXABLE AMOUNT

function generateTaxableAmount(doc, invoice) {
  doc
    .font(fontBold)
    .fontSize(10)
    .text(`Taxable Amount`, 350, 480, { align: "left" })
    .fontSize(10)
    .text(
      `${
        "Rs " +
        // new Intl.NumberFormat("en-IN", {
        //   maximumSignificantDigits: 3,
        // }).format
        invoice.taxable
      }`,
      450,
      480,
      {
        align: "right",
      }
    );
}

// TAX
//const taxPosition = subTotalPosition + 60;

function generateTaxPosition(doc, invoice) {
  if (invoice.tax.GST == 0) {
    doc
      .fontSize(10)
      .font(fontBold)
      .text(`CGST @9% : `, 350, 505, { align: "left" })
      .font(fontBold)
      .fontSize(10)
      .text(
        `${
          "Rs " +
          // new Intl.NumberFormat("en-IN", {
          //   maximumSignificantDigits: 3,
          // }).format
          invoice.taxAmount.CGST
        }`,
        450,
        505,
        {
          align: "right",
        }
      )
      .fontSize(10)
      .text(`SGST @9% : `, 350, 525, { align: "left" })
      .font(fontBold)
      .fontSize(10)
      .text(
        `${
          "Rs " +
          // new Intl.NumberFormat("en-IN", {
          //   maximumSignificantDigits: 3,
          // }).format(
          invoice.taxAmount.SGST
        }`,
        450,
        525,
        {
          align: "right",
        }
      );
  } else {
    doc
      .font(fontBold)
      .fontSize(12)
      .text(`IGST @18% : `, 350, 525, { align: "left" })
      .fontSize(12)
      .text(
        `${
          "Rs " +
          // new Intl.NumberFormat("en-IN", {
          //   maximumSignificantDigits: 3,
          // }).format(
          invoice.taxAmount.GST
        }`,
        450,
        525,
        {
          align: "right",
        }
      );
  }
}

// GRAND TOTAL
function generateGrandTotal(doc, invoice) {
  //let total = invoice.total;
  generateHL(doc, 545);
  doc
    .font(fontBold)
    .fontSize(12)
    .text(`Total Amount: `, 350, 552, { align: "left" })
    .fontSize(12)
    .text(
      `${
        "Rs " +
        //new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(
        invoice.total
      }`,
      450,
      552,
      {
        align: "right",
      }
    );
  generateHL(doc, 575);
}

/**
 *  Add Paid Emblem
 */

function generatePaidImage(doc) {
  doc.image(
    path.join(__dirname + "../../../assets/images/paid.png"),
    50,
    doc.page.height - 230,
    {
      width: 150,
    }
  );
}

/**
 *  Add Footer
 */

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "This is computer generated invoice no signature required.",
      50,
      doc.page.height - 70,
      { align: "center", width: 500 }
    );
}

/**
 *  Utility Functions
 */

function generateHL(doc, y) {
  doc
    .strokeColor("#0080ff")
    .lineWidth(1.5)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function generateHL2(doc, y) {
  doc
    .strokeColor("#d6d6d6")
    .lineWidth(0.5)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function generateTableRow(
  doc,
  y,
  hsnsan,
  description,

  amount,
  discount,
  total
) {
  doc
    .fontSize(10)
    //.text(package, 50, y, { width: 100 })
    .text(hsnsan, 50, y, { width: 60 })
    .text(description, 120, y, { width: 200 })
    .text(amount, 340, y, { width: 60 })
    .text(discount, 430, y)
    .text(total, 0, y, { align: "right" });
}

function formatCurrency(cents) {
  if (String(cents).indexOf(".") >= 0) {
    return `Rs. ` + cents.toFixed(2);
  } else {
    return `Rs. ` + cents;
  }
}

function formatDate(date) {
  let day = date.getDate();
  day = day >= 10 ? day : `0${day}`;
  const exp_month = date.getMonth() + 1;
  const month = exp_month >= 10 ? exp_month : "0" + exp_month;
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

module.exports = {
  generateInvoice,
};
