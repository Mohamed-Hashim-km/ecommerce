import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, fireDB } from "../../firebase/FirebaseConfig";

const OrderDetail = () => {
  const [orderDetailes, setOrderDetailes] = useState([]);
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

  return (
    <div>
      <div>
        <div className="py-5">
          <h1 className=" text-xl text-pink-300 font-bold">All Order</h1>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
            <tbody>
              <tr>
                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">
                  OrderId
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Product Image
                </th>

                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Product Name
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Person Email
                </th>

                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  {" "}
                  Date And Time
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                  Status
                </th>
              </tr>
              {orderDetailes.map((item, index) => {
                return (
                  <tr className="text-pink-300" key={index}>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">{item.orderId}</td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      <img className="object-contain w-full h-full" src={item.productImageUrl} alt="" />
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 cursor-pointer ">{item.title}</td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      {item.email}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      <p> {item.date}</p>
                      <br />
                      <p>{item.time}</p>
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  text-green-500 border-pink-100 stroke-slate-500 text-slate-500  cursor-pointer ">
                      {item.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
