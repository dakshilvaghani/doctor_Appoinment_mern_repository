import React from "react";

const CheckoutSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="_bg-white p-6 mx-auto">
        <svg /* Add your SVG properties here */></svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-10 text-center">
            <Link
              to="/home"
              className="px-12 bg-buttonColor text-white font-semibold py-3"
            >
              Go Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
