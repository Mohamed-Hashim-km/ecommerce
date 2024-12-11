import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../../store/isWork";
import Loader from "../../components/Loader";

const Signup = () => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const isLoader = useSelector((state) => state.loaderState.isLoading);
  const dispatch = useDispatch();

  const SighnupHandler = async (name, email, password) => {
    if (name.current.value == "" || email.current.value == "" || password.current.value == "") {
      return toast.warning("You Missed Somthing", {
        toastId: 1,
      });
    }

    dispatch(loaderHandler(true));

    try {
      const data = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
      const user = data.user;
      const date = new Date();

      setDoc(doc(fireDB, "user", user.uid), {
        name: name.current.value,
        email: user.email,
        uid: user.uid,
        date: date.toLocaleDateString(),
        role: false,
        time: date.toLocaleTimeString(),
      });

      toast.success("Signed SuccussFully");
      navigate("/login");
      dispatch(loaderHandler(false));
    } catch (error) {
      console.log(error);
      toast.error("Email Alredy Used")
      dispatch(loaderHandler(false));
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      <div className="flex justify-center items-center h-screen">
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 "></h2>
          </div>
          <div className="mb-3">
            <input type="text" placeholder="Full Name" ref={name} className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200" />
          </div>
          <div className="mb-3">
            <input type="email" placeholder="Email Address" ref={email} className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200" />
          </div>
          <div className="mb-5">
            <input type="password" placeholder="Password" ref={password} className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200" />
          </div>
          <div className="mb-5">
            <button type="button" onClick={() => SighnupHandler(name, email, password)} className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md ">
              Signup
            </button>
          </div>
          <div>
            <h2 className="text-black">
              Have an account{" "}
              <Link className=" text-pink-500 font-bold" to={"/login"}>
                Login
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
