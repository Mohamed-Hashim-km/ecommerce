import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";

const Signup = () => {
  const name = useRef("");
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();

  const [isLoad, setIsLoad] = useState(false);

  const SighnupHandler = async (name, email, password) => {
    if (name.current.value == "" || email.current.value == "" || password.current.value == "") {
      return toast.warning("You Missed Somthing", {
        toastId: 1,
      });
    }

    const names = name.current.value;

    setIsLoad(true);

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
      setIsLoad(false);
    } catch (error) {
      console.log(error);
      toast.error("Email Alredy Used");
      setIsLoad(false);
    }
  };

  return (
    <>
      


{isLoad ? (
        <div className="bg-white min-h-screen flex justify-center items-center">
          <Loader /></div>):(
<div className="min-h-screen items-center flex">
<div
    className="relative mx-auto w-full  max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
    <div className="w-full">
        <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Signup</h1>
            <p className="mt-2 text-gray-500">Signup in below to create your account</p>
        </div>
        <div className="mt-5">
            <form action="">
            <div className="relative mt-6">
                    <input ref={name} type="text"  placeholder="Name" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                    <label for="text" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Name</label>
                </div>
                <div className="relative mt-6">
                    <input ref={email} type="email"  placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                    <label for="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div className="relative mt-6">
                    <input ref={password} type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                    <label for="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div className="my-6">
                    <button onClick={() => SighnupHandler(name, email, password)} type="button" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Signup</button>
                </div>
                <p className="text-center text-sm text-gray-500">Have account?
                    <Link to={"/login"}><a 
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Login
                    </a>.</Link>
                </p>
            </form>
        </div>
    </div>
</div>
</div>)}

    </>
  );
};

export default Signup;
