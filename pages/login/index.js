import React from "react";
import Link from "next/link";

import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useState } from "react";

const LoginPage = () => {
  const [formvalues, setFormvalues] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState({});
  const [issubmit, setIssubmit] = useState(false);

  //!
  const handleClick = (e) => {
    // if (!error) {
    // }
  };

  //! updating values
  const updateData = (e) => {
    let { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
    seterror(valid(formvalues));
  };

  //! validation function
  let valid = (values) => {
    let errors = {};

    //! email
    if (!values.email) {
      errors.email = "*Username required";
    }
    //! password
    if (!values.password) {
      errors.password = "*password Required";
    }
    return errors;
  };
  return (
    <div>
      <div className="flex items-center justify-center w-screen  text-center">
        <div className="bg-white rounded-2xl shadow-2xl w-65 md:w-96 max-w-4xl">
          {/*  */}
          <div className="p-4 md:p-5">
            <div className="p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-darkViolet mb-1 md:mb-2">
                Sign in to Account
              </h2>

              <div className=" border-2 w-8 md:w-12 bg-darkViolet border-darkViolet inline-block mb-2"></div>

              <div className="flex flex-col items-center mb-2">
                <div className="bg-gray-100 md:w-64 p-1 md:p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Username"
                    className="bg-gray-100 border-none text-sm flex-1 focus:border-none"
                    onChange={updateData}
                    required
                  />
                </div>
                <p className="text-xs mb-2 text-red-600 ">{error.email}</p>
                <div className="bg-gray-100  md:w-64 p-1 md:p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 border-none text-sm flex-1 focus:border-none"
                    onChange={updateData}
                    required
                  />
                </div>
                <p className="text-xs mb-2 text-red-600 ">{error.password}</p>
                <Link href="/Dashboard" passHref>
                  <button
                    type="submit"
                    className="border-2 border-darkViolet text-darkViolet rounded-full px-8 md:px-12 py-1 md:py-2 inline-block font-semibold hover:bg-darkViolet hover:text-white"
                    onClick={handleClick}
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
