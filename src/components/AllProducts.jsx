import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { addDoc, collection, doc, getDocs, limit, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../store/isWork";
import Loader from "./Loader";

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [forFilter, setForFilter] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  const isLoad = useSelector((state) => state.loaderState.isLoading);
  const dispatch = useDispatch();
  const addAllProducts = async () => {
    dispatch(loaderHandler(true));
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    setProduct(data);
    setFilterProducts(data);
    dispatch(loaderHandler(false));
  };


  useEffect(() => {
    addAllProducts();
  }, []);

  let handleProductFilter = (option) => {
    let products = product.filter((item) => {
      if (option == null) {
        return item;
      }
      if (option == "below500") {
        return item.currentPrice < 500;
      }
      if (option == "Above1000") {
        return item.currentPrice > 1000;
      }
      if (option == "Above5000") {
        return item.currentPrice > 5000;
      }
    });
    setFilterProducts(products);
  };

  const navigate = useNavigate();

  const [currentUser, setcurrentUser] = useState();


  const AddCartHandler = async (product) => {
    if (currentUser == undefined) {
      return navigate("/login");
    }

    const cartRef = collection(fireDB, "user", currentUser, "productCart");
    const res = await getDocs(query(cartRef, where("uid", "==", product.uid)));

    if (res.empty) {
      addDoc(collection(fireDB, "user", currentUser, "productCart"), {
        uid: product.uid,
        description: product.description,
        price: product.price,
        currentPrice: product.currentPrice,
        productImageUrl: product.productImageUrl,
        quantity: product.quantity,
        title: product.title,
        category: product.category,
      });
      toast.success("Cart Added");

       const snapShot = await getDocs(collection(fireDB, "user", currentUser, "productCart"));
             const length = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
             dispatch(cartLengthHandler(length.length));


    } else {
      toast.error("product alredy in the cart", {
        toastId: 1,
      });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setcurrentUser(user.uid);
    });
  }, [auth]);


  return (
    <Layout>
      {isLoad ? (
        <div className="bg-white justify-center flex min-h-screen items-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-10" >
          <div className="">
            <div className="relative inline-block text-left">
              <div className="group">
                {/* <select onChange={(e) => handleProductFilter(e.target.value)}>
                  <option value="below500">Below 500</option>
                  <option value="above1000">Above 1000</option>
                  <option value="above5000">Above 5000</option>
                </select> */}

                <button type="button" className="rounded-lg ml-2 inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 focus:outline-none">
                  Price Filter
                  <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>

                <div className="absolute left-0 w-40 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                  <div className="py-1">
                    <a type="button" onClick={() => handleProductFilter(null)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  cursor-pointer">
                      All Product
                    </a>
                    <a type="button" onClick={() => handleProductFilter("below500")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Below ₹500
                    </a>
                    <a type="button" onClick={() => handleProductFilter("Above1000")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Above ₹1000
                    </a>
                    <a type="button" onClick={() => handleProductFilter("Above5000")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Above ₹5000
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-center mb-5 text-2xl font-semibold">ALL PRODUCTS</h1>
          </div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4">
                {filterProducts?.map((item, index) => {
                  return (
                    <div key={index} className="p-4 w-full md:w-1/4 sm:w-1/2 lg:w-1/4">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer flex flex-col">
                        <img onClick={() => navigate(`/productInfo/${item.uid}`)} className="lg:h-80 h-48 object-contain w-full py-5" src={item.productImageUrl} alt="product" />
                        <div className="p-6 flex flex-col flex-grow">
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-2 truncate">{item.title}</h1>
                          <h1 className="text-xs font-medium text-gray-500 line-through">{item.price}</h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">₹{item.currentPrice}</h1>

                          <div className="flex justify-center mt-auto">
                            <button onClick={() => AddCartHandler(item)} className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold">
                              ADD CART
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
};

export default AllProducts;
