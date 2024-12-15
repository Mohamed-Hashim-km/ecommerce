import React, { useEffect, useState } from 'react'
import { Carousel } from "@material-tailwind/react";
import { loaderHandler, loggedHandler } from '../store/isWork';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';

const HeroSection = () => {



  return (
    <>
 
 <Carousel 
      
      autoplay={true} 
      autoplayDelay={3000} 
      loop={true} 
      transition={{ type: "tween", duration: 0.5 }} 
    >
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/96394e0900c8983c.jpg?q=20"
        alt="image 1"
        className="h-full w-full object-contain"
      />
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/07c59f7cf6a426bc.jpg?q=20"
        alt="image 2"
        className="h-full w-full object-contain"
      />
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/8074e7b2f6d2bfea.jpg?q=20"
        alt="image 3"
        className="h-full w-full object-contain"
      />
    </Carousel>
 </>
   


  )
}

export default HeroSection
