import React, { useEffect, useState } from 'react'
import { Carousel } from "@material-tailwind/react";

import sale from '../assets/Hero/sale.png';

import shopping from '../assets/Hero/shopping.png';

import women from '../assets/Hero/women.png';



const HeroSection = () => {



  return (
    <>
 <div data-aos="zoom-in-up">
 <Carousel className='bg-yellow-700'
  autoplay={true} 
  autoplayDelay={3000} 
  loop={true} 
  transition={{ type: "tween", duration: 0.5 }} 
>
<div className="flex bg-yellow-700 justify-center    h-full">
    <div className="w-full   flex md:w-1/3 p-2">
      <img
        src={women} // Change to the first image source
        alt="image 1"
        className="object-contain h-64 w-full"
      />
    </div>
  </div>
  <div className="flex justify-center ">
    <div className="w-full flex md:w-1/3 p-2">
      <img
        src={shopping} // Change to the second image source
        alt="image 2"
        className="object-contain  h-64 w-full"
      />
    </div>
  </div>
  <div className="flex justify-center bg-yellow-700">
    <div className="w-full flex md:w-1/3 p-2">
      <img
        src={sale} // Change to the third image source
        alt="image 3"
        className="object-contain   text-yellow-700   bg-yellow-700   h-64 w-full"
      />
    </div>
  </div>

</Carousel>
</div>
 </>
   


  )
}

export default HeroSection
