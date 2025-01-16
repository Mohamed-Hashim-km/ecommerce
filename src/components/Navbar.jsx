import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedHandler } from "../store/isWork";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { cartLengthHandler } from "../store/isWork";
import { MdHome } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { RiLoginCircleFill } from "react-icons/ri";

const Navbar = () => {
  const cartLength = useSelector((state) => state.loaderState.cartLength);
  const isLog = useSelector((state) => state.loaderState.isLogged);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName,setCurrentUserName]=useState()
  
  

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const recentLoggedUser = async () => {
      const userDetail = query(doc(fireDB, "user", currentUser));
      const querysnapshot = await getDoc(userDetail);
      setCurrentUserName(querysnapshot.data());
    };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user.uid);
      dispatch(loggedHandler(true));
    } else {
      setCurrentUser(null);
      dispatch(loggedHandler(false));
    }
  });

  const LoggoutHandler = async () => {
    try {
      await auth.signOut();

      toast.success("Logout success ", {
        toastId: 1,
      });
      navigate("/");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
    dispatch(loggedHandler(false));
  };

  const carts = async () => {
    const snapShot = await getDocs(collection(fireDB, "user", currentUser, "productCart"));
    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    

    dispatch(cartLengthHandler(res.length));
  };

  useEffect(() => {
    carts();
    recentLoggedUser()
  }, [currentUser]);

  return (
    <>
      <nav className="bg-[#f7f3ed] sticky top-0 py-2 z-[999] shadow-sm shadow-gray-600">
        <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
          <div className="left py-3 lg:py-0">
            <Link to={"/"}>
              <h2 className=" font-extrabold text-orange-900   text-3xl text-center">SkyloStore</h2>
            </Link>
          </div>
          <Searchbar />
          <div className="right flex justify-center items-center sm:mt-0 mt-4 md:mt-4 lg:mt-0  sm:mb-4 lg:mb-0">
            <ul className="flex gap-4 space-x-3 items-center text-black font-medium text-md px-5">
              {isLog && (
                <li className="gap-4">
                  <Link to={"/"}>
                    <MdHome className="text-[23px] hover:text-gray-700 outline-none" data-tooltip-id="my-tooltip" data-tooltip-content="Home" />
                  </Link>
                </li>
              )}

              {!isLog && (
                <li>
                  <Link to={"/login"} className="hover:text-gray-700">
                    <button className="px-5 py-1 bg-orange-500 rounded-2xl hover:rounded-lg transition-all duration-300 text-white">Get Started</button>
                  </Link>
                </li>
              )}

              {isLog && (
                <li>
                  <Link to={"/user-dashboard"} className="hover:text-gray-700">
                    <FaUser className="text-[18px] outline-none" data-tooltip-id="my-tooltip" data-tooltip-content={currentUserName?.name} />
                  </Link>
                </li>
              )}

              {isLog && (
                <li>
                  <Link to={"/cartPage"}>
                    <div className="relative flex items-center">
                      <svg className="w-6 h-6 outline-none fill-current hover:text-gray-700" viewBox="0 0 24 24" data-tooltip-id="my-tooltip" data-tooltip-content="Cart">
                        <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z" />
                      </svg>
                      {cartLength == 0 ? (
                        <span></span>
                      ) : (
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] rounded-full  w-3 h-3 flex items-center justify-center">{cartLength}</span>
                      )}
                    </div>
                  </Link>
                </li>
              )}

              {isLog && (
                <li className="cursor-pointer items-center flex hover:text-gray-700" onClick={LoggoutHandler}>
                  <button>
                    <FaPowerOff className="text-[18px] outline-none" data-tooltip-id="my-tooltip" data-tooltip-content="Logout" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Tooltip id="my-tooltip" />
      </nav>
    </>
  );
};

export default Navbar;
