import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { onAuthStateChanged } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, query } from "firebase/firestore";
import { loggedHandler } from "../../store/isWork";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
];

const UserDashBoard = () => {
  const [user, setUser] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [currentUser, setcurrentUser] = useState();
  console.log(buyList);

  const UserBuyList = async () => {
    const snapShot = await getDocs(collection(fireDB, "user", currentUser, "buyedItems"));
    const res = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBuyList(res);
  };

  const recentLoggedUser = async (userid) => {
    const userDetail = query(doc(fireDB, "user", userid));
    const querysnapshot = await getDoc(userDetail);
    console.log(querysnapshot.data());
    setUser(querysnapshot.data());
  };

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (user) => {
        recentLoggedUser(user.uid);
        setcurrentUser(user.uid);
      },
      []
    );
  }, [auth]);

  useEffect(() => {
    UserBuyList();
  }, [currentUser]);

  // const RemoveOrderHandler=async(id)=>{

  //    try {
  //         await deleteDoc(doc(fireDB, "user", currentUser, "buyedItems", id));
  //         UserBuyList()
  //         toast.success("Order Removed SuccussFully",{
  //           toastId:1
  //         });

  //       } catch (error) {
  //         console.error("Error deleting product: ", error);
  //       }
  // }

  return (
    <Layout>
      <div className=" container mx-auto px-4 py-5 lg:py-8">
        <div className="top ">
          <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
            <div className="flex justify-center">
              <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
            </div>

            <div className="">
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Name :</span>
                {user.name}
              </h1>
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Email :</span> {user.email}
              </h1>
            </div>
          </div>
        </div>
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
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
    </Layout>
  );
};

export default UserDashBoard;
