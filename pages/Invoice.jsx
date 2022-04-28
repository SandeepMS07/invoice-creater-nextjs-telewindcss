import React, { useState } from "react";
import details from "./details";

const Invoice = () => {
  const [values, setValues] = useState({
    name: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    // const name = e.target.name.value;
    // const res = await fetch("/api/form", {
    //   body: JSON.stringify({
    //     name: name,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });
    // const result = await res.json();
    // alert(`Is this your full name: ${result.name}`);
  };

  const handleChange = (e) => {
    setValues({ ...setValues, [e.target.name]: e.target.value });
  };
  return (
    <div className="">
      <header className="bg-darkViolet sticky top-0 h-[72px] flex  justify-between items-center drop-shadow-xl ">
        <p className="md:ml-8 mr-8 text-white font-semibold uppercase">
          Invoice
        </p>
        <button className="px-3 py-1 mr-9 hover:bg-indigo-500 hover:text-white">
          Print
        </button>
      </header>
      <div className="container">
        <div className="grid md:grid-cols-8 divide-x m-1 border-[1px] ">
          {/* invoice form */}
          <div className="md:col-span-5">
            <div className="">
              <form
                action=""
                className="flex flex-wrap border-2 m-20 "
                onSubmit={handleSubmit}
              >
                {/* <input type="text" className=" "/> */}
                {details.map((inp, ind) => {
                  return (
                    <div key={ind} className="md:m-2 ">
                      <label
                        htmlFor=""
                        className="block text-gray-700 text-xs font-bold mb-2 uppercase"
                      >
                        {inp.name} :
                      </label>
                      <input
                        type={inp.type}
                        placeholder={inp.placeholder}
                        onChange={handleChange}
                        className="block bg-gray-200 border-[1px] px-6 md:px-2 py-[2px] rounded outline-none border-gray-400 placeholder:text-sm placeholder:font-[400] focus:border-none focus:outline-none"
                      />
                    </div>
                  );
                })}

                <button
                  type="submit"
                  className="m-4 px-6 bg-darkViolet hover:bg-blue-800 hover:text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          {/* invoice review */}
          <div className="col-span-3">
            <div className="flex flex-col items-center justify-center min-h-[600px] border-2 m-4 bg-gray-300">
              <p className="text-3xl font-semibold">invoice view</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
