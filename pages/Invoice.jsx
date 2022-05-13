/** Package imports */

// import { response } from "express";
import axios from "axios";
import React, { useState } from "react";
import inputDetails from "../components/details/inputDetails";
import ItemlistDetails from "../components/details/ItemlistDetails";

// const express = require("express");
// const app = express();

const Invoice = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    student_id: "",
    learncab_id: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gstNo: "",
    payment_id: "",
    invoice_date: "",
  });
  const [itemList, setItemList] = useState([
    {
      description: "",
      price: "",
      amount_paid: "",
      plan_code: "",
      days: "",
      discount: "",
    },
  ]);
  let [pdf, setPdf] = useState();
  const [error, seterror] = useState({});
  const [issubmit, setissubmit] = useState(false);

  const url = { pdf };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(values);
    // console.log(values, itemList);
    let details = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      student_id: values.student_id,
      learncab_id: values.learncab_id,
      address: values.address,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      country: values.country,
      gst_number: values.gstNo,
      payment_id: values.payment_id,
      items: [
        {
          description: itemList.description,
          price: itemList.price,
          amount_paid: itemList.amount_paid,
          plan_code: itemList.plan_code,
          days: itemList.days,
          discount: itemList.discount,
        },
      ],
      invoice_date: values.invoice_date,
    };

    let apiUrl = "http://localhost:8000/invoy/api/v1/invoice/generateInvoice";

    axios({
      method: "post",
      url: apiUrl,
      data: details,
      headers: { "Content-Type": "application/Json" },
    })
      .then((response) => {
        //handle success
        console.log(response.data.fileurl);
        let urldata = response.data.fileurl;
        setPdf(urldata);
        // const pdfData = JSON.stringify(response);
        // console.log(pdfData);
        // setPdf(pdfData);
      })
      .catch((response) => {
        //handle error
        console.log(response);
      });

    setValues([
      {
        name: "",
        email: "",
        phone: "",
        student_id: "",
        learncab_id: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        gst_number: "",
        payment_id: "",
        invoice_date: "",
      },
    ]);
    setItemList([
      {
        description: "",
        price: "",
        amount_paid: "",
        plan_code: "",
        days: "",
        discount: "",
      },
    ]);

    // console.log(data);
    // setissubmit(true);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
    seterror(valid(values));
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList];
    list[index][name] = value;
    setItemList(list);
    seterror(valid(itemList));
  };

  /**  Dynamic items
   *  Add
   */
  const handleaddclick = () => {
    setItemList([
      ...itemList,
      {
        description: "",
        price: "",
        amountPaid: "",
        planCode: "",
        Days: "",
        discount: "",
      },
    ]);
  };

  /**
   *  Dynamic items
   *  Remove
   */

  const handleremove = (index) => {
    const list = [...itemList];
    // if (list.length == 1) return false;
    list.splice(index, 1);
    setItemList(list);
  };

  /**
   * vaidation
   */

  let valid = (value) => {
    let errors = {};
    let userReg = /^[A-Za-z]+$/g;
    let emailReg =
      /^[A-Za-z]+([.-]?[A-Za-z]+)*@[A-Za-z]+([.-]?[A-Za-z]+)*(.[A-Za-z]{2,3})+$/g;

    //!  name
    if (!value.name) {
      errors.name = "*Name required";
    } else if (!userReg.test(value.name)) {
      errors.name = "*Name must contain only Alphabets";
    }

    //!  email
    if (!value.email) {
      errors.email = "*Email required";
    } else if (!emailReg.test(value.email)) {
      errors.email = "*email should be in the format ex.axxx@gmaxx.com";
    }

    //!  Phone number
    if (!value.phone) {
      errors.phone = "*phonenumber required";
    }

    //!  Student id
    if (!value.student_id) {
      errors.student_id = "*Student id required";
    }

    //!  Learncab id
    if (!value.learncab_id) {
      errors.learncab_id = "*Learncab id required";
    }

    //!   Address
    if (!value.address) {
      errors.address = "*address required";
    }

    //!   city
    if (!value.city) {
      errors.city = "*city required";
    }

    //!   state
    if (!value.state) {
      errors.state = "*state required";
    }

    //!   pincode
    if (!value.pincode) {
      errors.pincode = "*pincode required";
    }

    //!   country
    if (!value.country) {
      errors.country = "*country required";
    }

    //!   gst_number
    if (!value.gst_number) {
      errors.gst_number = "*gst_number required";
    }

    //!  Payment id
    if (!value.payment_id) {
      errors.payment_id = "*Payment id required";
    }

    //!  invoice_date
    if (!value.invoice_date) {
      errors.invoice_date = "*invoice date required";
    }

    // //? items
    // //! description
    // if (!value.description) {
    //   errors.description = "*description required";
    // }

    // //! price
    // if (!value.price) {
    //   errors.price = "*price required";
    // }

    // //! amount_paid
    // if (!value.amount_paid) {
    //   errors.amount_paid = "*amount paid required";
    // }

    // //! plan_code
    // if (!value.plan_code) {
    //   errors.plan_code = "*plan code required";
    // }

    // //! days
    // if (!value.days) {
    //   errors.days = "*days required";
    // }

    // //! discount
    // if (!value.discount) {
    //   errors.discount = "*discount required";
    // }

    return errors;
  };

  return (
    <div className="">
      <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex  justify-between items-center drop-shadow-xl z-50">
        <p className="ml-8 mr-8 text-white font-semibold uppercase">Invoice</p>
        <button className="px-3 py-1 mr-9 hover:bg-indigo-500 hover:text-white">
          Print
        </button>
      </header>

      <div className="grid lg:grid-cols-8 md:grid-cols-4 divide-x m-1 border-[1px]">
        {/* invoice form */}
        <div className="md:col-span-5">
          <p className="text-xl font-semibold m-3 ml-5 flex md:hidden">
            Invoice
          </p>
          <div className="">
            <form
              action=""
              className="flex flex-col justify-center items-center border-2 md:border-2 m-9 mx-12 md:m-4 p-4"
              onSubmit={handleSubmit}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-full">
                {inputDetails.map((inp, ind) => {
                  return (
                    <div key={ind} className="md:mr-10">
                      <label
                        htmlFor=""
                        className="block text-gray-700 text-xs font-bold mb-1"
                      >
                        {inp.title}
                      </label>
                      <input
                        type={inp.type}
                        name={inp.name}
                        id={inp.id}
                        placeholder={inp.placeholder}
                        onChange={handleChange}
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-1 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-none focus:outline-none focus:drop-shadow-xl"
                      />
                      <p className="text-red-600 text-xs mb-2">
                        {error[inp.name]}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className=" border-[1px] w-full bg-gray-200 border-gray-200 inline-block mb-2 drop-shadow-xl"></div>

              {/* items */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor=""
                  className="block text-gray-700 text-sm font-bold"
                >
                  Items:
                </label>
                {itemList.map((x, i) => {
                  return (
                    <div key={i}>
                      <div className="grid md:grid-cols-3">
                        {ItemlistDetails.map((inp, ind) => {
                          return (
                            <div key={ind}>
                              <div className=" border-[1px] w-full mt-4 bg-gray-200 border-gray-200 inline-block mb-1 drop-shadow-xl"></div>

                              <div className={`mr-10`}>
                                <label
                                  htmlFor=""
                                  className="text-gray-700 text-xs font-bold mb-1 flex md:justify-center items-center"
                                >
                                  {inp.title}
                                </label>
                                <input
                                  type={inp.type}
                                  className="border-[1px] outline-none w-full p-[2px] rounded  bg-gray-200 border-gray-400 placeholder:text-xsj placeholder:font-[400] focus:border-none focus:outline-none  focus:drop-shadow-xl"
                                  name={inp.name}
                                  id={inp.id}
                                  placeholder={inp.placeholder}
                                  onChange={(e) => handleItemChange(e, i)}
                                />
                                <p className="text-red-600 text-xs mb-2">
                                  {error[inp.name]}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-end items-center mr-6">
                        {itemList.length !== 1 && (
                          <button
                            className="m-4 w-20 py-2 text-xs bg-red-600 hover:bg-red-500 border-red-500 hover:text-white"
                            onClick={() => handleremove(i)}
                          >
                            Delete
                          </button>
                        )}
                        {itemList.length - 1 === i && (
                          <button
                            className="m-4 w-20 py-2 text-xs bg-darkViolet hover:bg-blue-800 hover:text-white"
                            onClick={handleaddclick}
                          >
                            Add Items
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className=" border-[1px] w-full bg-gray-200 border-gray-200 inline-block"></div>

              <div className="flex flex-row">
                <button
                  type="submit"
                  className="m-4 w-20 py-1 text-center bg-darkViolet hover:bg-blue-800 hover:text-white"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="m-4 w-20 py-1 text-center bg-darkViolet hover:bg-blue-800 hover:text-white"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* invoice review */}
        <div className="col-span-3">
          <div className="flex flex-col items-center justify-center  w-auto min-h-[600px] border-2 m-4 bg-gray-300">
            <object
              data={pdf}
              // data={ }
              type="application/pdf"
              // width="100%"
              // height="100%"
              className="w-[600px] h-[700px]"
            >
              <p>
                Alternative text - include a link <a className="text-darkViolet font-bold underline" href={pdf}>to the PDF!</a>
              </p>
            </object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

// export async function getServerSideProps() {
//   // const { params } = context;
//   let apiUrl = "http://localhost:8000/invoy/api/v1/invoice/generateInvoice";

//   const res = await axios({
//     method: "get",
//     url: apiUrl,
//     data: details,
//     headers: { "Content-Type": "application/Json" },
//   });
//   const data = await res.json();
//   console.log(data);

//   return {
//     props: {
//       details: data,
//     },
//   };
// }
