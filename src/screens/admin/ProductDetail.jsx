import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { productDataStore } from "../../store/productData";
import { useDispatch } from "react-redux";
import Searchbar from "../../components/Searchbar";
import ProductSeacrh from "./ProductSeacrh";
import { toast } from "react-toastify";
const ProductDetail = ({ GetAllProducts }) => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GetProducts = async () => {
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);

    setProduct(data);
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const ProductDeleteHandler = async (id) => {
    console.log(id);

    try {
      await deleteDoc(doc(fireDB, "products", id));
      GetProducts();
      GetAllProducts();
      toast.success("Product Deleted");
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between mt-5 items-center">
        <h1 className=" text-xl text-black font-bold">All Product</h1>
        <ProductSeacrh />
        <Link to={"/addProduct"}>
          <button className="px-5 py-2 bg-[#fea928] text-white border  rounded-lg">Add Product</button>
        </Link>
      </div>

      <div className="w-full overflow-x-auto mb-5 shadow-sm shadow-black">
        <table className="w-full text-left border border-collapse sm:border-separate border-black text-black">
          <tbody>
            <tr>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-black text-slate-700 bg-slate-100 font-bold fontPara">
                S.No.
              </th>
              <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-black text-slate-700 bg-slate-100 font-bold fontPara">
                Image
              </th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Title
              </th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Price
              </th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                CurrentPrice
              </th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Category
              </th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Date
              </th>
              {/* <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Action
              </th> */}
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Action
              </th>
              <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Action
              </th>
            </tr>
            {product.map((value, index) => {
              return (
                <tr className="text-black" key={index}>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 ">{index + 1}</td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    <img className=" object-contain w-full h-full" src={value.productImageUrl} alt="" />
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">{value.title}</td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">₹{value.price}</td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    ₹{value.currentPrice}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {value.category}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">{value.date}</td>
                  {/* <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">edit</td> */}
                  <td
                    onClick={() => ProductDeleteHandler(value.uid)}
                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                  >
                    <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100  rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </span>
                      <span className="hidden md:inline-block">Delete</span>
                    </button>
                  </td>
                  <td
                    onClick={() => navigate(`/editeProduct/${value.uid}`)}
                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                  >
                    <button className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100  rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </span>
                      <span className="hidden md:inline-block">Edit</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
