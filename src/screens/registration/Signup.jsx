import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';


const Signup = () => {
    const [isRole,setIsRole]=useState(false)
    const registerName = useRef();
    const registerEmail = useRef();
    const registerPassword = useRef();
  
    const navigate = useNavigate();
  
    function register(name, email,password) {
      createUserWithEmailAndPassword(auth, email, password).then((data) => {
        const user=data.user;
        const date=new Date();
        
       setDoc(doc(fireDB, "users",user.uid),{
          name:name,
          email:email,
          password:password,
          date:date.toLocaleDateString(),
          role:isRole,
        })
        
        
  
      })
      .catch((err)=>{
        toast('error is',err.message);
      });
    }
    return (
      <>
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
          <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 mt-12 flex flex-col items-cente">
              <div className="mt-12 flex flex-col items-cente">
                <div className="w-full flex-1 mt-8">
                  
  
                  <div className="mx-auto max-w-xs">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter Name"
                      ref={registerName}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email"
                      ref={registerEmail}
                    />
  
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      ref={registerPassword}
                    />
                    <button 
                    type="button"
                    onClick={()=>register(registerName.current.value,registerEmail.current.value,registerPassword.current.value)}
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-">Sign In</span>
                    </button>
                    <div className="mt-6 text-xs text-gray-600 text-center">
                      <p className=" text-base my-3">
                    <Link to={"/signin"}>Already have an acount? <span className=" text-blue-600">SignIn</span></Link>
  
                      </p>
                      I agree to abide by Cartesian Kinetics
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </div>
            </div></div>
            <div className="flex-1 bg-green-100 text-center hidden lg:flex">
              <div
                className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              ></div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Signup
