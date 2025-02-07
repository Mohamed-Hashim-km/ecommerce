import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

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

const EditeProduct = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  const fetchProductInfo = async () => {
    const docRef = await getDoc(doc(fireDB, "products", id));
    const products = { uid: docRef.id, ...docRef.data() };

    setProduct({
      title: products.title,
      price: products.price,
      currentPrice: products.currentPrice,
      productImageUrl: products.productImageUrl,
      category: products.category,
      description: products.description,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
  };

  useEffect(() => {
    fetchProductInfo();
  }, [id]);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    currentPrice: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });


  const ProductEditHandler = () => {
    if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "" || product.currentPrice == "") {
      return toast.error("All fields are required");
    }

    setDoc(doc(fireDB, "products", id), product);

    navigate("/admin-dashboard");
    toast.success("Product Edit SuccessFully")
  };

  return (
    <>  
    <div className="h-screen mt-12">
      <div className="flex justify-center items-center ">
        <div className="login_Form  px-8 py-6 shadow-black rounded-xl shadow-md">
          <div className="mb-5">
          <Link to={"/admin-dashboard"}><button className="px-4 py-2 rounded-md text-white bg-[#fea928]">Go Back</button></Link>

            <h2 className="text-center text-2xl font-bold text-black ">Edit</h2>
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
              className=" border text-black shadow-lg px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
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
              className=" border text-black shadow-lg  px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
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
              className=" border text-black shadow-lg px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
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
              className=" border text-black shadow-lg px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          <div className="mb-3">
            <select
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-black  border shadow-lg rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>

              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option className=" first-letter:uppercase" key={index} value={product.category}>
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
              className=" w-full px-2 py-1 text-black  border shadow-lg rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>
          <div className="mb-3">
            <button onClick={ProductEditHandler} type="button" className="0 bg-[#fea928] w-full text-white text-center py-2 font-bold rounded-md ">
              Edit
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default EditeProduct;
