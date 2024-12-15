import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import { productDataStore } from "../../store/productData";
import { useDispatch } from "react-redux";
import Searchbar from "../../components/Searchbar";
import ProductSeacrh from "./ProductSeacrh";
const ProductDetail = ({GetAllProducts}) => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addAllProducts = async () => {
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);

    setProduct(data);
   
  };
  
  useEffect(() => {
    addAllProducts();
  }, []);


  const ProductDeleteHandler = async (id) => {
    console.log(id);
    
    try {
      await deleteDoc(doc(fireDB, "products", id));
      addAllProducts();
      GetAllProducts()
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-black font-bold">All Product</h1>
        <ProductSeacrh/>
        <Link to={"/addProduct"}>
          <button className="px-5 py-2 bg-pink-500  text-white border  rounded-lg">Add Product</button>
        </Link>
      </div>
      {/* table  */}
      <div className="w-full overflow-x-auto mb-5">
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
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {value.title}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    ₹{value.price}
                  </td>
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
                    Delete
                  </td>
                  <td onClick={()=>navigate(`/editeProduct/${value.uid}`)}
                   
                    className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-red-500 cursor-pointer "
                  >
                    Edit
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
