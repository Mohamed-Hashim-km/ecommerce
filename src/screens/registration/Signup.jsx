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

    const names = name.current.value;

    dispatch(loaderHandler(true));

    try {
      const data = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
      const user = data.user;
      const date = new Date();

      setDoc(doc(fireDB, "user", user.uid), {
        name: names,
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
      toast.error("Email Alredy Used");
      dispatch(loaderHandler(false));
    }
  };

  return (
    <>
      {isLoader ? (
        <div className="bg-white min-h-screen flex justify-center items-center">
          {" "}
          <Loader />
        </div>
      ) : (
        <main className="mx-auto flex min-h-screen  w-full items-center justify-center bg-gray-900 text-white">
          <section className="flex w-[30rem] flex-col space-y-10">
            <div className="text-center text-4xl font-medium">Sign In</div>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input ref={name} type="text" placeholder="Name" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input ref={email} type="text" placeholder="Email" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>

            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
              <input ref={password} type="password" placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none" />
            </div>

            <button onClick={() => SighnupHandler(name, email, password)} type="button" className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">
              LOG IN
            </button>

            <p className="text-center text-lg">
              Have account?
              <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline">
                {" "}
                <Link className=" text-pink-500 font-bold" to={"/login"}>
                  Login
                </Link>
              </a>
            </p>
          </section>
        </main>
      )}
    </>
  );
};

export default Signup;
