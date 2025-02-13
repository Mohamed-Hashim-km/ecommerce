import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fireDB } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const GetAllProducts = async () => {
    const snapshot = await getDocs(collection(fireDB, "products"));
    const data = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));

    setData(data);
  };

  useEffect(() => {
    GetAllProducts();
  }, [search]);

  const filterSearchData = data.filter((obj) => obj.description.toLowerCase().includes(search.toLocaleLowerCase())).slice(0, 8);

  return (
    <>
      <div className="">
        <div className="input flex justify-center ">
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="  shadow-blue-gray-300 shadow-md placeholder-gray-400 rounded-full px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black "
          />
        </div>
        <div className=" flex justify-center">
          {search && (
            <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2">
              {filterSearchData.length > 0 ? (
                <>
                  {filterSearchData.map((item, index) => {
                    return (
                      <div onClick={() => navigate(`/productInfo/${item.uid}`)} key={index} className="py-2 px-2">
                        <div className="flex items-center gap-2">
                          <img className="w-10" src={item.productImageUrl} alt="" />
                          {item.title}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
