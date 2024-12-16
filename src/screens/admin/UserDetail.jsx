import React, { useEffect, useState } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const [user, setUser] = useState([]);
  const navigate=useNavigate()

  const addAllUsers = async () => {
    const snapshot = await getDocs(collection(fireDB, "user"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
    console.log(data);

    setUser(data);
  };

  console.log(user);

  // console.log(product);
  useEffect(() => {
    addAllUsers();
  }, [fireDB]);

   

  
  
  
   

  return (
    <div>
      <div>
        <div className="py-5 flex justify-between items-center">
          <h1 className=" text-xl text-black font-bold">All User</h1>
        </div>
        <div className="w-full overflow-x-auto shadow-sm shadow-black">
          <table className="w-full text-left border border-collapse sm:border-separate border-black text-black">
            <tbody>
              <tr>
                <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-black text-slate-700 bg-slate-100 font-bold fontPara">
                  S.No.
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Name
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Email
                </th>

                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Date
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                  Time
                </th>
                <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-black text-slate-700 bg-slate-100">
                Action
                </th>
              </tr>
              {user.map((item, index) => {
                return (
                  <tr className="text-black" key={index}>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 ">{index + 1}</td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.name}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                      {item.email}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      {item.date}
                    </td>
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                      {item.time}
                    </td>
                    <td  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-black stroke-slate-500 text-slate-500 text-green-700 cursor-pointer ">
                    <button type="button" onClick={()=>navigate(`/UserOrderDetails/${item.uid}`)} >Ordered Itmes</button>  
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

export default UserDetail;
