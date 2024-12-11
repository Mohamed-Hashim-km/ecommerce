import React from 'react'
import { Carousel } from "@material-tailwind/react";

const HeroSection = () => {
  return (
    <>
 
 <Carousel
      
      autoplay={true} // Enables autoplay
      autoplayDelay={3000} // Auto move every 3000ms (3 seconds)
      loop={true} // Enables looping of carousel
      transition={{ type: "tween", duration: 0.5 }} // Smooth transition
    >
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/96394e0900c8983c.jpg?q=20"
        alt="image 1"
        className="h-[50vh] w-full object-cover"
      />
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/07c59f7cf6a426bc.jpg?q=20"
        alt="image 2"
        className="h-[50vh] w-full object-cover"
      />
      <img
        src="https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/8074e7b2f6d2bfea.jpg?q=20"
        alt="image 3"
        className="h-[50vh] w-full object-cover"
      />
    </Carousel>
 </>
   


  )
}

export default HeroSection
