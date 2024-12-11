import React, { useEffect, useState } from 'react'
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const UserDetail = () => {
   
    const [user,setUser]=useState([])

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
     {/* text  */}
     <h1 className=" text-xl text-pink-300 font-bold">All User</h1>
 </div>
 {/* table  */}
 <div className="w-full overflow-x-auto">
     <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
         <tbody>
             <tr>
                 <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                 <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Name</th>
                 <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Email</th>

                 <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Date</th>
                 <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Time</th>

             </tr>
             {user.map((item,index)=>{
                return(
                <tr className="text-pink-300" key={index}>
                 <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                    {index+1}
                 </td>
                 <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                     {item.name}
                 </td>
                 <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-green-500 cursor-pointer ">
                 {item.email}
                 </td>
                 <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                 {item.date}
                 </td>
                 <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 text-red-500 cursor-pointer ">
                 {item.time}
                 </td>
             </tr>
                )
             })}
         </tbody>
     </table>
 </div>
</div>
</div>
  )
}

export default UserDetail
