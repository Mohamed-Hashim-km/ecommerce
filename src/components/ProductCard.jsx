import { addDoc, collection, doc, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, fireDB } from "../firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../store/isWork";
import { cartLengthHandler } from "../store/isWork";


// const productData = [
//     {
//         id: 1,
//         image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
//         title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 150,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 2,
//         image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
//         title: 'Kaushalam kalash Copper Pot',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 120,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 3,
//         image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
//         title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 130,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 4,
//         image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
//         title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 120,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 1,
//         image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
//         title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 150,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 2,
//         image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
//         title: 'Kaushalam kalash Copper Pot',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 120,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 3,
//         image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
//         title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 130,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     },
//     {
//         id: 4,
//         image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
//         title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
//         desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
//         price: 120,
//         trendingProductName: 'Featured',
//         quantity: 1,
//     }
// ]

const ProductCard = () => {
  const [product, setProduct] = useState([]);

  const isLoad = useSelector((state) => state.loaderState.isLoading);

  const dispatch = useDispatch();
  const addAllProducts = async () => {
    dispatch(loaderHandler(true));
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    setProduct(data.slice(0,8));
    dispatch(loaderHandler(false));
  };


  useEffect(() => {
    addAllProducts();
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


      const snapShot =await getDocs(collection(fireDB, "user", currentUser, "productCart"));
        const length = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        dispatch(cartLengthHandler(length.length))  
        
    
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
    <>
    
    <div className="mt-10">
  <div className="">
    <h1 className="text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
  </div>
  <section className="text-gray-600 body-font">
    <div className="container px-5 py-5 mx-auto">
      <div className="flex flex-wrap -m-4">
        {product.map((item, index) => {
          return (
            <div key={index} className="p-4 w-full md:w-1/4 sm:w-1/2 lg:w-1/4">
              <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer px-2">
                <img
                  onClick={() => navigate(`/productInfo/${item.uid}`)}
                  className="lg:h-80 h-64 object-contain w-full py-5"
                  src={item.productImageUrl}
                  alt="product"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"></h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{item.title}</h1>
                  <h1 className="text-xs font-medium text-gray-500 line-through">{item.price}</h1>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">₹{item.currentPrice}</h1>

                  <div className="flex justify-center">
                    <button
                      onClick={() => AddCartHandler(item)}
                      className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold"
                    >
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
    </>
  );
};

export default ProductCard;
