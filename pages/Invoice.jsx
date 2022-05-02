import React, { useState } from "react";
import inputDetails from "../components/details/inputDetails";
import ItemlistDetails from "../components/details/ItemlistDetails";

const Invoice = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    learncabId: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gstNo: "",
    paymentId: "",
  });
  const [itemList, setItemList] = useState([
    {
      description: "",
      price: "",
      amountPaid: "",
      planCode: "",
      Days: "",
      discount: "",
    },
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(values);
    console.log(values, itemList);
    setValues([
      {
        name: "",
        email: "",
        phone: "",
        studentId: "",
        learncabId: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
        gstNo: "",
        paymentId: "",
      },
    ]);
    setItemList([
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...itemList];
    list[index][name] = value;
    setItemList(list);
  };

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
  const handleremove = (index) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };

  return (
    <div className="">
      {/* <h1>{JSON.stringify(values)}</h1> */}
      <header className="bg-darkViolet sticky top-0 h-[72px] hidden md:flex  justify-between items-center drop-shadow-xl z-50">
        <p className="ml-8 mr-8 text-white font-semibold uppercase">Invoice</p>
        <button className="px-3 py-1 mr-9 hover:bg-indigo-500 hover:text-white">
          Print
        </button>
      </header>

      <div className="grid lg:grid-cols-8 md:grid-cols-4 divide-x m-1 border-[1px]">
        {/* invoice form */}
        <div className="md:col-span-5">
          <p className="text-xl font-semibold m-3 ml-5 flex md:hidden">Invoice</p>
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
                        className="block text-gray-700 text-xs font-bold mb-2"
                      >
                        {inp.title}
                      </label>
                      <input
                        type={inp.type}
                        name={inp.name}
                        id={inp.id}
                        placeholder={inp.placeholder}
                        onChange={handleChange}
                        className="block bg-gray-200 border-[1px] px-7 md:px-2 py-[2px] mb-4 rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-none focus:outline-none focus:drop-shadow-xl"
                      />
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
                              <div className=" border-[1px] w-full mt-4 bg-gray-200 border-gray-200 inline-block mb-2 drop-shadow-xl"></div>

                              <div className={`mr-10`}>
                                <label
                                  htmlFor=""
                                  className="text-gray-700 text-xs font-bold mb-2 flex md:justify-center items-center"
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
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
