import React from "react";
import { FaTshirt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";

const Track = () => {
  return (
    <section data-aos="zoom-in-up">
      <div className=" container mx-auto px-5 py-10 md:py-14">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full ">
            <div className="border-2 shadow-lg shadow-black hover:shadow-xl hover:shadow-gray-200 border-gray-300 bg-white  px-4 py-6 rounded-lg">
              <FaTshirt className="w-12 h-12 mb-3 inline-block text-[#fea928]" />
              <h2 className="title-font font-medium text-lg text-gray-900">Premium Tshirts</h2>
              <p className="leading-relaxed">Our T-Shirts are 100% made of cotton.</p>
            </div>
          </div>

          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 shadow-lg shadow-black hover:shadow-xl hover:shadow-gray-200 border-gray-300 bg-white  px-4 py-6 rounded-lg">
              <FaTruck className="w-12 h-12 mb-3 inline-block text-[#fea928]" />
              <h2 className="title-font font-medium text-lg text-gray-900">Fast Delivery</h2>

              <p className="leading-relaxed">Delivery Expect Within 7 Days</p>
            </div>
          </div>
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
            <div className="border-2 shadow-lg shadow-black hover:shadow-xl hover:shadow-gray-200 border-gray-300 bg-white  px-4 py-6 rounded-lg">
              <SiRazorpay className="w-12 h-12 mb-3 inline-block text-[#fea928]" />
              <h2 className="title-font font-medium text-lg text-gray-900">Payment</h2>
              <p className="leading-relaxed">100% Return Policy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Track;
