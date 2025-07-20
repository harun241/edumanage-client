import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/popular-classes") // Replace with your API
      .then((res) => res.json())
      .then((data) => setPopularClasses(data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section className="my-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
        🌟 Popular Classes
      </h2>
      {popularClasses.length > 0 ? (
        <Slider {...settings}>
          {popularClasses.map((cls) => (
            <div key={cls._id} className="p-2">
              <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-88 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{cls.title}</h3>
                  <p className="text-sm text-gray-500">Instructor: {cls.instructor}</p>
                  <p className="text-sm mt-2 text-green-600">
                    Enrolled: {cls.studentsEnrolled}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No popular classes found.</p>
      )}
    </section>
  );
};

export default PopularClasses;
