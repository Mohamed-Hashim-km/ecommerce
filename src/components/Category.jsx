import React from "react";
import { useNavigate } from "react-router-dom";

const category = [
  {
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "fashion",
  },
  {
    image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
    name: "shirt",
  },
  {
    image: "https://img.freepik.com/free-photo/still-life-rendering-jackets-display_23-2149745029.jpg",
    name: "jacket",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1680985551022-ad298e8a5f82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlfGVufDB8fDB8fHww",
    name: "mobile",
  },
  {
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww",
    name: "laptop",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1682435561654-20d84cef00eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    name: "shoes",
  },
  {
    image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    name: "watches",
  },
  {
    image:
      "data:image/jpeg;base64,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",
    name: "books",
  },
];
const Category = () => {
  const navigate = useNavigate();
  return (
    <div data-aos="zoom-in-up">
      <div className="flex flex-col  mt-5">
        <div className="flex overflow-x-scroll overflow-y-hidden lg:justify-center  hide-scroll-bar">
          <div className="flex ">
            {category.map((item, index) => {
              return (
                <div key={index} className="px-3 lg:px-10" onClick={() => navigate(`/category/${item.name}`)}>
                  <div className=" w-16  lg:w-24 lg:h-24 max-w-xs   transition-all  cursor-pointer mb-1 ">
                    <div className="flex justify-center   mb-1">
                      <img className="rounded-2xl h-[10vh] object-contain" src={item.image} alt="img" />
                    </div>
                    <h1 className=" text-sm lg:text-lg text-center font-medium title-font first-letter:uppercase ">{item.name}</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />
    </div>
  );
};

export default Category;
