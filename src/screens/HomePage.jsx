import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import Track from "../components/Track";
import TestiMonial from "../components/TestiMonial";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loaderHandler } from "../store/isWork";

const HomePage = () => {
  // const isLoader = useSelector((state) => state.loaderState.isLoading);
  // console.log(isLoader);


  
  


  return (
    <>
    {/* { isLoader?
    <Loader/> : */}
    <Layout>
        <HeroSection />
        <Category />
        <ProductCard />
        <Track />
        <TestiMonial />
      </Layout>
      
    </>
  );
};

export default HomePage;
