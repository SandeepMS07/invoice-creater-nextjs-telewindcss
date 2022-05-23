/** Package imports */

// import { response } from "express";
import axios from "axios";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import inputDetails from "../components/details/inputDetails";
import ItemlistDetails from "../components/details/ItemlistDetails";
import Embed from "react-embed";

// const express = require("express");
// const app = express();

const Invoice = () => {
  // Date
  // let setdate = () => {
  //   const current = new Date();
  //   let exp_day = current.getDate();
  //   let day = exp_day >= 10 ? exp_day : `0${exp_day}`;

  //   let exp_month = current.getMonth() + 1;
  //   let month = exp_month >= 10 ? exp_month : "0" + exp_month;

  //   let year = current.getFullYear();

  //   let exp_hour = current.getHours();
  //   let hour = exp_hour >= 10 ? exp_hour : "0" + exp_hour;

  //   let exp_min = current.getMinutes();
  //   let minute = exp_min >= 10 ? exp_min : "0" + exp_min;

  //   let exp_sec = current.getSeconds();
  //   let seconds = exp_sec >= 10 ? exp_sec : "0" + exp_sec;

  //   return (
  //     year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + seconds
  //   );
  // };

  let [values, setValues] = useState({
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
    date: "",
  });
  let [itemList, setItemList] = useState([
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
  let [error, seterror] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    valid(values);
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
      gst_number: values.gst_number,
      payment_id: values.payment_id,
      items: itemList,
      invoice_date: values.date,
    };
    console.log(details);
    console.log(itemList);
    console.log(values);
    let apiUrl = "http://localhost:8000/invoy/api/v1/invoice/generateInvoice";
    // {
    //   (Object.keys(error).length === 0 &&
    //     isSubmit) &&

    // }

    // setissubmit(true);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({ ...values, [name]: value });
    seterror(valid(values));
    console.log(values);
    // setissubmit(true)
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList];
    list[index][name] = value;
    setItemList(list);
    console.log(itemList);
    // seterror(valid(itemList));
  };

  /**
   *  Dynamic items
   *  Add
   */

  const handleaddclick = () => {
    setItemList([
      ...itemList,
      {
        description: "",
        price: "",
        amount_paid: "",
        plan_code: "",
        days: "",
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
    let emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
    let mobileReg =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

    //!  name
    if (!value.name) {
      errors.name = "*Name required";
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

    return errors;
  };

  return (
    <div className="">
      <Head>
        <title>Invoice</title>
      </Head>
      <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex  justify-between items-center drop-shadow-xl z-50">
        <p className="ml-8 mr-8 text-white font-semibold uppercase">Invoice</p>
        {/* <button className="px-3 py-1 mr-9 hover:bg-indigo-500 hover:text-white">
          Print
        </button> */}
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
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center border-2 md:border-2 m-9 mx-12 md:m-4 p-4"
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
                        value={values[inp.name]}
                        placeholder={inp.placeholder}
                        // onChange={(e) => handleChange(e)}
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
                                  value={itemList[inp.name]}
                                  placeholder={inp.placeholder}
                                  onChange={(e) => handleItemChange(e, i)}
                                  // onChange={(e) => handleChange(e)}
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
                        <div>
                          {itemList.length !== 1 && (
                            <button
                              className="m-4 w-20 py-2 text-xs bg-red-600 hover:bg-red-500 border-red-500 hover:text-white"
                              onClick={() => handleremove(i)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
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
                  // onClick={() => {
                  //   Array.from(document.querySelectorAll("input")).forEach(
                  //     (input) => (input.value = "")
                  //   );
                  //   setValues([{}]);
                  //   setItemList([{}]);
                  // }}
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
          <div className="flex flex-col items-center justify-center  md:w-[670px]  lg:w-auto min-h-[600px] border-2 m-4 bg-gray-300">
            <object
              data={pdf}
              type="application/pdf"
              // width="100%"
              // height="100%"
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[510px] lg:h-[600px]"
            >
              <p>
                Alternative text - include a link{" "}
                <a className="text-darkViolet font-bold underline" href={pdf}>
                  to the PDF!
                </a>
              </p>
            </object>
            {/* <iframe
              src={pdf}
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[510px] lg:h-[600px]"
            ></iframe> */}

            {/* <Embed
              url={pdf}
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[550px] lg:h-[700px]"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

// export async function getServerSideProps() {
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
