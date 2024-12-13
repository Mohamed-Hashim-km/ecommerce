import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../../store/isWork";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { loggedHandler } from "../../store/isWork";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const isLoader = useSelector((state) => state.loaderState.isLoading);
  const dispatch = useDispatch();

  const LoginHandler = async (email, password) => {
    if (email == "" || password == "") {
      return toast.warning("You Missed Somthing", {
        toastId: 1,
      });
    }

    dispatch(loaderHandler(true));

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const user = data.user;
      const res = getDoc(doc(fireDB, "user", user.uid));
      console.log(res);

      const userData = (await res).data();

      console.log(userData);

      if (userData.role) {
        navigate(`/admin-dashboard`);
        dispatch(loaderHandler(false));
        
      } else {
        navigate("/user-dashboard");
        dispatch(loaderHandler(false));
        dispatch(loggedHandler(true));
        
      }
    } catch (error) {
      console.log(error);
      dispatch(loaderHandler(false));
    }
  };

  // useEffect(()=>{
  //   LoginHandler()
  // },[lkfd])

  return (
    <>
      {isLoader && <Loader />}
      <div className="flex justify-center items-center h-screen">
        <div className="login_Form bg-white px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 "></h2>
          </div>

          <div className="mb-3">
            <input type="email" placeholder="Email Address" ref={email} className="bg-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200" />
          </div>
          <div className="mb-5">
            <input type="password" placeholder="Password" ref={password} className="bg-white border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200" />
          </div>
          <div className="mb-5">
            <button
              type="button"
              onClick={() => LoginHandler(email.current.value, password.current.value)}
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Login
            </button>
          </div>
          <div>
            <h2 className="text-black">
              Have an account{" "}
              <Link className=" text-pink-500 font-bold" to={"/signup"}>
                signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
