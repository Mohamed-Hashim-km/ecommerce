import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../../store/isWork";
import Loader from "../../components/Loader";
const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];

const AddProducts = () => {
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    currentPrice:"",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const isLoader = useSelector((state) => state.loaderState.isLoading);
  const dispatch = useDispatch();

  const addProductFunction = async () => {
    if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
      return toast.error("all fields are required");
    }

    dispatch(loaderHandler(true));
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add product successfully", {
        toastId: 1,
      });
      navigate("/admin-dashboard");

      dispatch(loaderHandler(false));
    } catch (error) {
      console.log(error);
      toast.error("Add product failed", {
        toastId: 1,
      });
      false;
    }
  };

  return (
    <div>
      {isLoader && <Loader />}
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 "></h2>
          </div>
          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Product Title"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              placeholder="Product Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="discount"
              value={product.currentPrice}
              onChange={(e) => {
                setProduct({
                  ...product,
                  currentPrice: e.target.value,
                });
              }}
              placeholder="DiscountPrice"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              placeholder="Product Image Url"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option className=" first-letter:uppercase" key={index} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>
          {/* Add Product Button  */}
          <div className="mb-3">
            <button onClick={addProductFunction} type="button" className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md ">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
