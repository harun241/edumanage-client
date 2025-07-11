// src/components/Banner.jsx
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/eduimg1.JPG";
import image2 from "../assets/eduimg2.JPG";
import image3 from "../assets/eduimag3.JPG";

const Banner = () => {
  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-20">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={700}
        emulateTouch
        swipeable
        className="shadow-lg"
      >
        {[image1, image2, image3].map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px]  object-cover"
            />
            <div className="absolute bottom-4 left-4 md:left-8 bg-black bg-opacity-70 text-white p-4 rounded-md max-w-xs md:max-w-md">
              {index === 0 && (
                <>
                  <h3 className="text-xl md:text-2xl font-bold">Empower Your Learning</h3>
                  <p>Discover courses and resources that unlock your future.</p>
                </>
              )}
              {index === 1 && (
                <>
                  <h3 className="text-xl md:text-2xl font-bold">Connect with Educators</h3>
                  <p>Join a platform built for students, teachers, and institutions.</p>
                </>
              )}
              {index === 2 && (
                <>
                  <h3 className="text-xl md:text-2xl font-bold">Learn Anytime, Anywhere</h3>
                  <p>Seamless access to learning materials on all devices.</p>
                </>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
