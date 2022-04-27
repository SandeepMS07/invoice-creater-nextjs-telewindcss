import React from "react";
import details from "./details";

const Invoice = () => {
 

  return (
    <div className="">
      {/* <div className="flex h-full flex-col justify-center items-center"> */}
      <header className="bg-green-400  sticky top-0 h-[73px] flex justify-center items-center font-semibold uppercase drop-shadow-xl">
        Invoice
      </header>
      {/* <div className="border-[1px] border-black"></div> */}

      {/* <h1 className="text-4xl mb-5 font-bold">Invoice</h1> */}

      <div className="grid grid-cols-8 divide-x min-h-screen">
        {/* invoice form */}
        <div className="col-span-5">
          <div className=" min-h-screen">
            <form action="">
              <div className="flex flex-wrap m-5 border-[1px] ">
                {details.map((inp, ind) => {
                  return (
                    <div key={ind} className="m-3">
                      <input
                        type={inp.type}
                        placeholder={inp.placeholder}
                        className="bg-gray-200 border-[1px] my-2 px-3 py-[6px] rounded outline-gray-400 border-gray-400"
                      />
                    </div>
                  );
                })}
                {/* <button
                  type="submit"
                  className="text-white border bg-green-600 border-green-600 hover:bg-transparent hover:text-green-600 rounded  px-5"
                >
                  submit
                </button> */}
              </div>
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
  );
};

export default Invoice;
