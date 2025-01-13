import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { cartLengthHandler, loaderHandler } from "../store/isWork";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";

const ProductInfo = () => {
  const [currentUser, setcurrentUser] = useState();

  const [isLoad,setIsLoad]=useState(false)
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  console.log(product);

  const fetchCartProductInfo = async () => {
   setIsLoad(true)
    const docRef = await getDoc(doc(fireDB, "user", currentUser, "productCart", id));
    setProduct({ uid: docRef.id, ...docRef.data() });
    setIsLoad(false)
  };

  useEffect(() => {
    fetchProductInfo();
    fetchCartProductInfo();
  }, [id]);

  const fetchProductInfo = async () => {
   setIsLoad(true)
    const docRef = await getDoc(doc(fireDB, "products", id));
    setProduct({ uid: docRef.id, ...docRef.data() });
    setIsLoad(false)
  };

  useEffect(() => {
    fetchProductInfo();
  }, [id]);

  const AddCartHandler = async () => {
    if (currentUser == undefined) {
      return navigate("/login");
    }

    const cartRef = collection(fireDB, "user", currentUser, "productCart");
    const res = await getDocs(query(cartRef, where("uid", "==", id)));

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
       const snapShot =await getDocs(collection(fireDB, "user", currentUser, "productCart"));
              const length = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              dispatch(cartLengthHandler(length.length))  
              
    } else {
      toast.error("Product Alredy In The Cart", {
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
      {/* {isLoad ? (
        <Loader />
      ) : (
        <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="">
                  <div className="">
                    <img className=" w-full  rounded-lg object-contain h-[60vh]" src={product.productImageUrl} alt="" />
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6 ">
                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-800 md:text-2xl dark:text-gray-300">{product.title}</h2>
                    <div className="flex flex-wrap items-center mb-6">
                      <ul className="flex mb-4 mr-2 lg:mb-0">
                        <li>
                          <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div >
                      <p className="inline-block text-lg line-through font-medium text-gray-800 dark:text-gray-400 ">
                        <span>Rs.{product.price}</span>
                      </p>
                    </div>
                    <p className="inline-block text-2xl font-semibold text-gray-800 dark:text-gray-400 ">
                      <span>Rs.{product.currentPrice}</span>
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-400"></h2>
                    <p>{product.description}</p>
                  </div>
                  <div className="mb-6 " />
                  <div className="flex flex-wrap items-center mb-6">
                    <button
                      type="button"
                      onClick={AddCartHandler}
                      className="w-full px-4 py-3 text-center text-pink-600 bg-pink-100 border border-pink-600  hover:bg-pink-600 hover:text-gray-100 rounded-xl"
                    >
                     
                      ADD CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>






      )} */}
    
    {isLoad ? (
  <Loader />
) : (
  <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-[80vh]">
    <div className="bg-white dark:bg-gray-800 flex mt-[150px] relative z-20 items-center overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 md:px-12 flex flex-col lg:flex-row relative">
        {/* Image on top for mobile, to the right for larger screens */}
        <div className="sm:w-full lg:w-1/3 flex justify-center items-center relative mb-6 lg:mb-0">
          <img
            src={product.productImageUrl}
            className="max-w-xs sm:max-w-sm lg:max-w-md w-full object-contain m-auto"
            alt={product.title}
          />
        </div>

        {/* Product details */}
        <div className="sm:w-full lg:w-2/3 flex flex-col relative z-20">
          <span className="w-20 h-2 dark:bg-white mb-12"></span>
          <h1 className="font-bebas-neue uppercase text-2xl sm:text-3xl lg:text-4xl font-black flex flex-col leading-none dark:text-white text-gray-800">
            {product.title}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-800 dark:text-white">
            {product.description}
          </p>
          <div className="mt-3">
            <p className="inline-block text-lg line-through font-medium text-gray-800 dark:text-gray-400">
              <span>Rs.{product.price}</span>
            </p>
          </div>
          <div>
            <p className="inline-block text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-400">
              <span>Rs.{product.currentPrice}</span>
            </p>
          </div>
          <div className="flex mt-8">
            <a
              href="#"
              onClick={AddCartHandler}
              className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
            >
              ADD TO CART
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
)}

    </Layout>
  );
};

export default ProductInfo;
