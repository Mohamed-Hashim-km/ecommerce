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

  const carts = async () => {
    const snapShot = await getDocs(collection(fireDB, "user", currentUser, "productCart"));
    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(res);

    dispatch(cartLengthHandler(res.length));
  };



  useEffect(() => {
    carts();
  }, [currentUser]);




  const LoggoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("Logout");
        dispatch(loggedHandler(false));
        navigate("/");
      })
      .catch(() => {
        toast.error("Error");
      });
  };

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
              <li>
                <Link to={"/allProducts"}>All Products</Link>
              </li>

              {!isLog && (
                <li>
                  <Link to={"/signup"}>Signup</Link>
                </li>
              )}
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
                  <Link to={"/cartPage"}>Cart({cartLength})</Link>
                </li>
              )}

              {isLog && (
                <li className=" cursor-pointer" onClick={LoggoutHandler}>
                  Logout
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
