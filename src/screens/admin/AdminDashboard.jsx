import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ProductDetail from "./ProductDetail";
import OrderDetail from "./OrderDetail";
import UserDetail from "./UserDetail";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { loaderHandler, loggedHandler } from "../../store/isWork";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [orderDetailes, setOrderDetailes] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const GetAllProducts = async () => {
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);

    setProduct(data);
  };
  // console.log(product);
  useEffect(() => {
    GetAllProducts();
  }, []);

  const OrderDetailes = async () => {
    const snapshot = await getDocs(collection(fireDB, "saleItems"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);

    setOrderDetailes(data);
  };

  console.log(orderDetailes);

  useEffect(() => {
    OrderDetailes();
  }, []);

  const Allusers = async () => {
    const snapshot = await getDocs(collection(fireDB, "user"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);

    setUser(data);
  };

  console.log(user);

  // console.log(product);
  useEffect(() => {
    Allusers();
  }, []);

  const [admin, setadmin] = useState([]);

  const recentLoggedUser = async (userid) => {
    const productAll = query(doc(fireDB, "user", userid));
    const querysnapshot = await getDoc(productAll);
    console.log(querysnapshot.data());
    setadmin(querysnapshot.data());
  };

  console.log(admin);

  const LoggoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(loggedHandler(false));
        toast.success("Admin Logout Succussfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error");
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      recentLoggedUser(user.uid);
    });
  }, [auth]);

  return (
    <>
    
    
        <div>
          <button onClick={LoggoutHandler} className="px-5 ml-3 py-2 bg-[#fea928] text-white  border  rounded-lg">
            Logout
          </button>

          <div className="top mb-5 px-5 mt-5">
            <div className=" bg-white py-5 border shadow-md shadow-blue-gray-500 rounded-lg">
              <h1 className=" text-center text-2xl font-bold text-black">Admin Dashboard</h1>
            </div>
          </div>
          <div className="px-5">
            <div className="mid mb-5">
              <div className=" bg-white py-5 rounded-xl border shadow-md shadow-blue-gray-500">
                <div className="flex justify-center">
                  <img  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                </div>
                <div className="">
                  <h1 className=" text-center text-lg text-black">
                    <span className=" font-bold">Name :</span>
                    {admin.name}{" "}
                  </h1>
                  <h1 className=" text-center text-lg text-black">
                    <span className=" font-bold">Email :</span> {admin.email}
                  </h1>
                </div>
              </div>
            </div>
            <div className="">
              <Tabs>
                <TabList className="flex flex-wrap -m-4 text-center justify-center ">
                  <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                    <div className=" border bg-white hover:bg-white shadow-md shadow-blue-gray-500 px-4 py-3 rounded-xl">
                      <div className="text-[#fea928] w-12 h-12 mb-3 inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-shopping-basket"
                        >
                          <path d="m5 11 4-7" />
                          <path d="m19 11-4-7" />
                          <path d="M2 11h20" />
                          <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
                          <path d="m9 11 1 9" />
                          <path d="M4.5 15.5h15" />
                          <path d="m15 11-1 9" />
                        </svg>
                      </div>
                      <h2 className="title-font font-bold text-3xl text-black fonts1">{product.length}</h2>
                      <p className=" text-black  font-bold">Total Products</p>
                    </div>
                  </Tab>
                  <Tab className="p-4 md:w-1/4 sm:w-1/2 w-full cursor-pointer">
                    <div className=" border bg-white hover:bg-white shadow-md shadow-blue-gray-500 px-4 py-3 rounded-xl">
                      <div className="text-[#fea928] w-12 h-12 mb-3 inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-list-ordered"
                        >
                          <line x1={10} x2={21} y1={6} y2={6} />
                          <line x1={10} x2={21} y1={12} y2={12} />
                          <line x1={10} x2={21} y1={18} y2={18} />
                          <path d="M4 6h1v4" />
                          <path d="M4 10h2" />
                          <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                        </svg>
                      </div>
                      <h2 className="title-font font-bold text-3xl text-black ">{orderDetailes.length}</h2>
                      <p className=" text-black  font-bold">Total Order</p>
                    </div>
                  </Tab>
                  <Tab className="p-4 md:w-1/3 sm:w-1/2 w-full cursor-pointer">
                    <div className=" border bg-white hover:bg-white shadow-md shadow-blue-gray-500 px-4 py-3 rounded-xl">
                      <div className="text-[#fea928] w-12 h-12 mb-3 inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={50}
                          height={50}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-users"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <h2 className="title-font font-bold text-3xl text-black fonts1">{user.length}</h2>
                      <p className=" text-black  font-bold">Total users</p>
                    </div>
                  </Tab>
                </TabList>
                <TabPanel>
                  <ProductDetail GetAllProducts={GetAllProducts} />
                </TabPanel>
                <TabPanel>
                  <OrderDetail />
                </TabPanel>
                <TabPanel>
                  <UserDetail />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default AdminDashboard;
