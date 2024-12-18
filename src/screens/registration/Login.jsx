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
        navigate("/");
        dispatch(loaderHandler(false));
        dispatch(loggedHandler(true));
        toast.success("Loged Succussfully")
        
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
      

     {isLoader?<div className="bg-white  justify-center flex min-h-screen items-center ">  <Loader /></div>: 
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
</main>}

    </>
  );
};

export default Login;
