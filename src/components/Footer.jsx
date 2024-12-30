import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="shadow-black bg-[#232323] shadow-2xl cursor-text">
     <div >
    <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
        <div className="p-5">
            <h3 className="font-bold text-3xl text-red-900">SnapStore</h3>
        </div>
        <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">Resources</div>
            <a className="my-3 block text-white" href="/#">Documentation <span className="text-teal-600 text-xs p-1"></span></a><a
                className="my-3 block text-white" href="/#">Tutorials <span className="text-teal-600 text-xs p-1"></span></a><a
                className="my-3 block text-white" href="/#">Support <span className="text-teal-600 text-xs p-1">New</span></a>
        </div>
        <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">Support</div>
            <a className="my-3 block text-white" href="/#">Help Center <span className="text-teal-600 text-xs p-1"></span></a><a
                className="my-3 block text-white" href="/#">Privacy Policy <span className="text-teal-600 text-xs p-1"></span></a><a
                className="my-3 block text-white" href="/#">Conditions <span className="text-teal-600 text-xs p-1"></span></a>
        </div>
        <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">Contact us</div>
            <a className="my-3 block text-white" href="/#">XXX XXXX, Floor 4 San Francisco, CA
                <span className="text-teal-600 text-xs p-1"></span></a><a className="my-3 block text-white" href="/#">contact@company.com
                <span className="text-teal-600 text-xs p-1"></span></a>
        </div>
    </div>
</div>

<div className="bg-[#232323] pt-2">
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
        <div className="my-5 text-white">© Copyright 2020. All Rights Reserved.</div>
    </div>
</div>

    </div>
  );
};

export default Footer;
