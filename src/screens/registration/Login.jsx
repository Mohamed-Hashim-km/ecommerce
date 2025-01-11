import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { loggedHandler } from "../../store/isWork";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(false);
  

  const dispatch = useDispatch();

  const LoginHandler = async (email, password) => {
    if (email == "" || password == "") {
      return toast.warning("You Missed Somthing", {
        toastId: 1,
      });
    }

    setIsLoad(true)

    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      const user = data.user;
      const res = getDoc(doc(fireDB, "user", user.uid));
      console.log(res);

      const userData = (await res).data();

      console.log(userData);

      if (userData.role) {
        navigate(`/admin-dashboard`);
        toast.success("Admin Logged Successfully")  

        
      } else {
        dispatch(loggedHandler(true));
        navigate("/");
        toast.success("Logged Successfully")  

      } 
    } catch (error) {
      setIsLoad(false);
      console.log(error);
      toast.error("Invalid email or password")
    }finally {
      setIsLoad(false);
    }
  };

  

  return (
    <>
      

     {/* {isLoad?<div className="bg-white  justify-center flex min-h-screen items-center ">  <Loader /></div>: 
     <main className="mx-auto flex min-h-screen  w-full items-center justify-center bg-gray-900 text-white">
     
    <section className="flex w-[30rem] flex-col space-y-10">
        <div className="text-center text-4xl font-medium">Log In</div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input ref={email} type="text" placeholder="Email" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"/>
        </div>

        <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input ref={password} type="password" placeholder="Password" className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"/>
        </div>

        <button  onClick={() => LoginHandler(email.current.value, password.current.value)} type="button" className="transform rounded-sm bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400">LOG IN</button>


        <p className="text-center text-lg">
            No account?
            <a href="#" className="font-medium text-indigo-500 underline-offset-4 hover:underline"> <Link className=" text-pink-500 font-bold" to={"/signup"}>
            Create One
              </Link></a>
        </p>
    </section>
</main>} */}


{isLoad?<div className="bg-white  justify-center flex min-h-screen items-center ">  <Loader /></div>:
<div className="min-h-screen items-center flex">
<div
    className="relative mx-auto w-full  max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
    <div className="w-full">
        <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Login</h1>
            <p className="mt-2 text-gray-500">Login in below to access your account</p>
        </div>
        <div className="mt-5">
            <form action="">
                <div className="relative mt-6">
                    <input ref={email} type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" />
                    <label for="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div className="relative mt-6">
                    <input ref={password} type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                    <label for="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div className="my-6">
                    <button onClick={() => LoginHandler(email.current.value, password.current.value)} type="button" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Login</button>
                </div>
                <p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                    <Link to={"/signup"}><a 
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                        up
                    </a>.</Link>
                </p>
            </form>
        </div>
    </div>
</div>
</div>}



    </>
  );
};

export default Login;
