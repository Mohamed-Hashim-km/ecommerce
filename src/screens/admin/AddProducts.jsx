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
    name: "Select",
  },
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
    name: "watches",
  },
  {
    name: "books",
  },
];

const AddProducts = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    currentPrice: "",
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
    if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "" || product.currentPrice == "") {
      return toast.error("all fields are required");
    }

    dispatch(loaderHandler(true));
    navigate("/admin-dashboard");
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add product successfully", {
        toastId: 1,
      });
   

      
    } catch (error) {
      console.log(error);
      dispatch(loaderHandler(false));
      toast.error("Add product failed", {
        toastId: 1,
      });
      
    }

    dispatch(loaderHandler(false));
  };

  return (
    <div>
      {isLoader && <Loader />}
      <div className="flex justify-center items-center h-screen">
        <div className="login_Form bg-white px-8 py-6 border border-black rounded-xl shadow-md">
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-black "></h2>
          </div>
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
              className="bg-white border text-black border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
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
              className="bg-white border text-black border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
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
              className="bg-white border text-black border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
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
              className="bg-white border text-black border-black px-2 py-2 w-96 rounded-md outline-none placeholder-black"
            />
          </div>
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-black bg-white border border-black rounded-md outline-none  "
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
              className=" w-full px-2 py-1 text-black bg-white border border-black rounded-md outline-none placeholder-black "
            ></textarea>
          </div>
          <div className="mb-3">
            <button onClick={addProductFunction} type="button" className="bg-blue-800  w-full text-white text-center py-2 font-bold rounded-md ">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
