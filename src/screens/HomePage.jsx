import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Category from "../components/Category";
import ProductCard from "../components/ProductCard";
import Track from "../components/Track";
import TestiMonial from "../components/TestiMonial";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <>
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
