import React from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedHandler } from "../store/isWork";
import { auth } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";

const Navbar = () => {
  const isLog = useSelector((state) => state.loaderState.isLogged);
  console.log(isLog);
  
  const dispatch=useDispatch()
  const navigate=useNavigate()
  


  const LoggoutHandler=()=>{
    auth.signOut().then(()=>{
      toast.success("Logout")
      dispatch(loggedHandler(false))
      navigate("/")
      

    }).catch(()=>{
      toast.error("Error")
    })
  }


  return (
    <nav className="bg-gray-600 sticky top-0 z-[999]">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">E-Shop</h2>
          </Link>
        </div>
        <div className="right flex justify-center mb-4 lg:mb-0">
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>
            {!isLog&&<li>
                <Link to={'/signup'}>Signup</Link>
            </li> }
            {!isLog&&<li>
                <Link to={'/login'}>Login</Link>
            </li> }
            {isLog&&<li>
                <Link to={'/user-dashboard'}>User</Link>
            </li>}
            {/* <li>
                <Link to={'/admin-dashboard'}>Admin</Link>
            </li> */}
           {isLog&&<li className=" cursor-pointer" onClick={LoggoutHandler} >
            Logout
            </li>}
            {isLog&&<li>
                <Link to={'/cartPage'}>Cart
                </Link>
            </li>}
        </ul>
        </div>
        <Searchbar />
      </div>
    </nav>
  );
};

export default Navbar;
