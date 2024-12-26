import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { loaderHandler } from "../store/isWork";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Category = () => {
  const { categoryName } = useParams();
  const [product, setProduct] = useState([]);


  const [isLoad,setIsLoad]=useState(false)
  const dispatch = useDispatch();
  const GetAllProducts = async () => {
    setIsLoad(true)
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    setProduct(data);
    setIsLoad(true)
  };

  console.log(product);

  useEffect(() => {
    GetAllProducts();
  }, []);

  const navigate = useNavigate();

  const [currentUser, setcurrentUser] = useState();

  console.log(currentUser);

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

  const filterProducts = product.filter((item) => {
    return item.category == categoryName;
  });

  return (
    <>
      <Layout>
        {isLoad ? (
          <Loader />
        ) : (
          <div className="mt-10">
            <div className="">
              <h1 className=" text-center mb-5 text-2xl font-semibold">{categoryName}</h1>
            </div>
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-wrap -m-4">
                  {filterProducts.map((item, index) => {
                    // const { image, title, price } = item

                    return (
                      <div key={index} className="p-4 w-full md:w-1/4">
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer px-2">
                          <img onClick={() => navigate(`/productInfo/${item.uid}`)} className="lg:h-80  h-full object-contain w-full py-5 " src={item.productImageUrl} alt="blog" />
                          <div className="p-6">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"></h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3 truncate">{item.title}</h1>
                            <h1 className="text-xs font-medium text-gray-500 line-through"> {item.price}</h1>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">₹{item.currentPrice}</h1>

                            <div className="flex justify-center ">
                              <button onClick={() => AddCartHandler(item)} className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
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
    </>
  );
};

export default Category;
