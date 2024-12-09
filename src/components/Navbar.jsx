import React from "react";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <nav className="bg-gray-600 sticky top-0 z-[999]">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">E-Shop</h2>
          </Link>
        </div>
        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>
            {/* Signup */}
            <li>
                <Link to={'/signup'}>Signup</Link>
            </li> 
            {/* Signup */}
            <li>
                <Link to={'/login'}>Login</Link>
            </li> 
            {/* User */}
            <li>
                <Link to={'/user-dashboard'}>User</Link>
            </li>
            {/* Admin */}
            <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li>
            {/* logout */}
           <li className=" cursor-pointer" >
            logout
            </li>
            {/* Cart */}
            <li>
                <Link to={'/cart'}>
                </Link>
            </li>
        </ul>
        </div>
        {/* Search Bar  */}
        <Searchbar />
      </div>
    </nav>
  );
};

export default Navbar;
