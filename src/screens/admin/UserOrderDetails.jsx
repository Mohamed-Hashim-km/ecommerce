import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, query } from "firebase/firestore";
import Loader from "../../components/Loader";
import { Link, useParams } from "react-router-dom";
const UserOrderDetails = () => {
  const [user, setUser] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [address, UserAdress] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const { id } = useParams();


  const UserBuyList = async () => {
    setIsLoad(true);
    const snapShot = await getDocs(collection(fireDB, "user", id, "buyedItems"));

    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setBuyList(res);
    setIsLoad(false);

    userAddress();
  };

  const userAddress = async () => {
    const snapShot = await getDocs(collection(fireDB, "user", id, "Address"));
    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    UserAdress(res);
  };

  useEffect(() => {
    UserBuyList();
  }, [id]);

  return (
    <>
      {isLoad ? (
        <Loader />
      ) : (
        <>
        
        
          {buyList.length > 0 ? (
            <>
              {address.map((item, index) => {
                return (
                  <div className="container mx-auto flex justify-center   top-0 sticky z-[999] " key={index}>
                    
                    <div className="bg-white flex py-6 shadow-lg shadow-black   rounded-xl ">
<Link to={"/admin-dashboard"}><button className="ml-3 px-10 py-1 flex justify-end rounded-md text-white bg-[#fea928]">Go Back</button></Link>

                      <div className="px-6 ">
                        <h2 className="title-font font-extrabold text-lg  text-gray-900 tracking-widest ">NAME</h2>
                        <p className="mt-1">{item.name}</p>
                      </div>
                      <div className="px-6 ">
                        <h2 className="title-font font-extrabold text-lg  text-gray-900 tracking-widest ">ADDRESS</h2>
                        <p className="mt-1">{item.address}</p>
                      </div>
                      <div className="px-6 ">
                        <h2 className="title-font font-semibold  text-gray-900 tracking-widest text-lg">COUNTRY</h2>
                        <p className="mt-1 font-normal">{item.country}</p>
                      </div>
                      <div className="px-6 ">
                        <h2 className="title-font font-semibold  text-gray-900 tracking-widest text-lg">STATE</h2>
                        <p className="mt-1 font-normal">{item.state}</p>
                      </div>
                      <div className="px-6 ">
                        <h2 className="title-font font-semibold  text-gray-900 tracking-widest text-lg">CITY</h2>
                        <p className="mt-1 font-normal">{item.city}</p>
                      </div>

                      <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-lg">PHONE</h2>
                        <p className="leading-relaxed">123-456-7890</p>
                        <h2 className="title-font font-semibold text-gray-900 tracking-widest text-lg">ZIP CODE</h2>
                        <a className="text-red-500 leading-relaxed">{item.zipCode}</a>
                      </div>
                    </div>
                  </div>
                );
              })}
<div className="container border shadow-lg shadow-black flex justify-center ml-24 mt-10"> 

              <div className=" container mx-auto px-4 pb-5 ">
                <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                      <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {buyList.map((item, index) => {
                            return (
                              <div className="flex flex-wrap items-center gap-y-4 py-6" key={index}>
                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                  {/* <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt> */}

                                  <dd className="mt-1.5 text-base text-gray-900 dark:text-white">
                                    <img className="w-[100px] h-[10vh] object-contain" src={item.productImageUrl} />
                                  </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>

                                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                    <a href="#" className="hover:underline">
                                      {item.orderId}
                                    </a>
                                  </dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{item.date}</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                  <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">₹{item.currentPrice}</dd>
                                </dl>

                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                  <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                  <dd className="me-2 mt-1.5 inline-flex items-center text-green-600 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                                    <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                                      />
                                    </svg>
                                    {item.status}
                                  </dd>
                                </dl>

                                {/* <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
              <button onClick={()=>{RemoveOrderHandler(item.id)}} type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Cancel order</button>
            </div> */}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              </div>
            </>
          ) : (
            <h1 className="text-center font-extrabold text-lg">No Orders</h1>
           
          )}
         
        </>
      )}
    </>
  );
};

export default UserOrderDetails;
