import React from "react";

const InvoiceReview = ({ data }) => {
  <div>
    <h1>hshsda</h1>
    <object
      data={data}
      type="application/pdf"
      // width="100%"
      // height="100%"
      className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[510px] lg:h-[600px]"
    >
      <p>
        Alternative text - include a link{" "}
        <a className="text-darkViolet font-bold underline" href={data}>
          to the PDF!
        </a>
      </p>
    </object>
  </div>;
};

export default InvoiceReview;
