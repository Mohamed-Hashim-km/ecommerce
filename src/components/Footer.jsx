import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
    const currentYear=new Date().getFullYear()
  return (
    <div className="shadow-black bg-[#f7f3ed] shadow-2xl cursor-text">
     <div >
    <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
        <div className="p-5 mt-5 sm:mt-0">
        <h2 className=" font-extrabold text-orange-900   text-3xl text-center">SkyloStore</h2>
        </div>
        <div className="p-5">
            <div className="text-sm uppercase text-[#fea928] font-bold">Resources</div>
            <a className="my-3 block text-black" href="/#">Documentation <span className="text-[#fea928] text-xs p-1"></span></a><a
                className="my-3 block text-black" href="/#">Tutorials <span className="text-[#fea928] text-xs p-1"></span></a><a
                className="my-3 block text-black" href="/#">Support <span className="text-[#fea928] text-xs p-1">New</span></a>
        </div>
        <div className="p-5">
            <div className="text-sm uppercase text-[#fea928] font-bold">Support</div>
            <a className="my-3 block text-black" href="/#">Help Center <span className="text-[#fea928] text-xs p-1"></span></a><a
                className="my-3 block text-black" href="/#">Privacy Policy <span className="text-[#fea928] text-xs p-1"></span></a><a
                className="my-3 block text-black" href="/#">Conditions <span className="text-[#fea928] text-xs p-1"></span></a>
        </div>
        <div className="p-5">
            <div className="text-sm uppercase text-[#fea928] font-bold">Contact us</div>
            <a className="my-3 block text-black" href="/#">Edure,Padamughal
                <span className="text-[#fea928] text-xs p-1"></span></a><a className="my-3 block text-black" href="/#">hashimhx3@gmail.com
                <span className="text-[#fea928] text-xs p-1"></span></a>
        </div>
    </div>
</div>

<div className="bg-[#f7f3ed] pt-2">
    <div className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center">
        <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
           
            <a href="/#" className="w-6 mx-1 ">
            <FaInstagram  className="text-red-500 text-xl"/>
            </a>
            <a href="/#" className="w-6 mx-1">
            <FaLinkedinIn className="text-blue-800 text-xl"/>
            </a>
            <a href="/#" className="w-6 mx-1">
            <FaWhatsapp className="text-green-700 text-xl"/>
            </a>
            <a href="/#" className="w-6 mx-1">
            <FaYoutube className="text-red-600 text-xl"/>
            </a>
        </div>
        <div className="my-5 text-black">© Copyright {currentYear}. All Rights Reserved.</div>
    </div>
</div>

    </div>
  );
};

export default Footer;
