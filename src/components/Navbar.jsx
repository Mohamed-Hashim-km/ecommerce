import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedHandler } from "../store/isWork";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { cartLengthHandler } from "../store/isWork";

const Navbar = () => {
  const isLog = useSelector((state) => state.loaderState.isLogged);

  const cartLength = useSelector((state) => state.loaderState.cartLength);

  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    setCurrentUser(user.uid);
  });

  if (currentUser) {
    dispatch(loggedHandler(true));
  } else {
    dispatch(loggedHandler(false));
  }

  const LoggoutHandler =async () => {
    try {
      await auth.signOut(); 
      dispatch(loggedHandler(false));
      navigate("/"); 
      toast.success("Logout", {
        toastId: 1
      });
    } catch (error) {
      toast.error("Logout failed: " + error.message); 
    }
  };


  const carts = async () => {
    const snapShot = await getDocs(collection(fireDB, "user", currentUser, "productCart"));
    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch(cartLengthHandler(res.length));
  };

  useEffect(() => {
    carts();
  }, [currentUser]);

 

  return (
    <>
      <nav className="bg-white sticky top-0 z-[999] shadow-lg shadow-black">
        <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
          <div className="left py-3 lg:py-0">
            <Link to={"/"}>
              <h2 className=" font-extrabold text-red-900  text-2xl text-center">SnapStore</h2>
            </Link>
          </div>
          <div className="right flex justify-center mb-4 lg:mb-0">
            <ul className="flex space-x-3 text-black font-medium text-md px-5 ">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              {/* <li>
                <Link to={"/allProducts"}>All Products</Link>
              </li> */}

              {/* {!isLog && (
                <li>
                  <Link to={"/signup"}>Signup</Link>
                </li>
              )} */}
              {!isLog && (
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              )}
              {isLog && (
                <li>
                  <Link to={"/user-dashboard"}>User</Link>
                </li>
              )}

              {isLog && (
                <li className="flex">
                  <Link to={"/cartPage"}>
                    <div className=" flex ">
                      <div className="relative ">
                        <div className="t-0 absolute left-3">
                          <p className="flex  h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cartLength}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="file: mt-1 h-6 w-6">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </li>
              )}

              {isLog && (
                <li  className=" cursor-pointer" onClick={LoggoutHandler}>
                <button>Logout</button>  
                </li>
              )}
            </ul>
          </div>
          <Searchbar />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
