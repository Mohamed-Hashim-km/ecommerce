import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, fireDB } from "../../firebase/FirebaseConfig";

const OrderDetail = () => {
  const [orderDetailes, setOrderDetailes] = useState([]);
  const [filterOrders,setFilterOrders]=useState("")
  const OrderDetailes = async () => {
    const snapshot = await getDocs(collection(fireDB, "saleItems"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);
    // const sorted=data.sort((a, b) => new Date(a.date) - new Date(b.date))


    setOrderDetailes(data);
  };

  console.log(orderDetailes);
  

 let orders=[]
      if(filterOrders==""){
        orders=orderDetailes
      }
      if(filterOrders=="Ascending"){
        orders=orderDetailes.sort((a, b) => new Date(a.date) - new Date(b.date))
      }
      if(filterOrders=="Descending"){
        orders=orderDetailes.sort((a, b) => new Date(b.date) - new Date(a.date))
      }
 
   
      

 

  useEffect(()=>{
    OrderDetailes();
  },[])

  return (
    <div>
       
      <div>
        <div className="py-5 flex justify-between">
          <h1 className=" text-xl text-black font-bold">All Order</h1>

         <div className="relative inline-block text-left">
    <div className="group">
        <button type="button"
            className="rounded-lg ml-2 inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-pink-500  focus:outline-none ">
            Date Filter
           
            <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 12l-5-5h10l-5 5z" />
            </svg>
        </button>

      
        <div
            className="absolute left-0 w-40  origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
            <div className="py-1 ">
            <a onClick={()=>setFilterOrders("Ascending")}  href="#" className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100">Ascending</a>

                <a onClick={()=>setFilterOrders("Descending")}  href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Descending</a>
               
            </div>
        </div>
    </div>
</div>

        </div>
       

       
        <div className="w-full overflow-x-auto shadow-sm shadow-black ">
          <table className="w-full text-left border border-collapse sm:border-separate border-black text-black ">
            <tbody>
              <tr>
                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-black text-slate-700 bg-slate-100 font-bold fontPara">
                  OrderId
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Product Image
                </th>

                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Product Name
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Person Email
                </th>

                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  {" "}
                  Date And Time
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Status
                </th>
              </tr>
              {orders.map((item, index) => {
                return (
                  <tr className="text-black" key={index}>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 ">{item.orderId}</td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      <img className="object-contain w-full h-full" src={item.productImageUrl} alt="" />
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 cursor-pointer ">{item.title}</td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-black cursor-pointer ">
                      {item.email}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-black cursor-pointer ">
                      <p> {item.date}</p>
                      <br />
                      <p>{item.time}</p>
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0  text-green-500 border-black stroke-slate-500 text-slate-500  cursor-pointer ">
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
