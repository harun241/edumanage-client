import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetch("https://edumanage-server-rho.vercel.app/api/popular-classes")
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
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="my-16 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
        🌟 Popular Classes
      </h2>

      {popularClasses.length > 0 ? (
        <Slider {...settings}>
          {popularClasses.map((cls) => (
            <div key={cls._id} className="p-4">
              <div
                className="
                group
                bg-white/80 dark:bg-gray-800/80 
                backdrop-blur-lg 
                border border-gray-200 dark:border-gray-700
                rounded-3xl 
                shadow-lg 
                overflow-hidden 
                transition-all duration-500 
                hover:shadow-2xl 
                hover:-translate-y-2
                hover:bg-white dark:hover:bg-gray-700
                "
              >
                <div className="overflow-hidden">
                  <img
                    src={cls.image}
                    alt={cls.title}
                    className="
                      h-64 w-full object-cover 
                      transition-transform duration-500 
                      group-hover:scale-105
                    "
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {cls.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    👨‍🏫 {cls.instructor}
                  </p>

                  <p className="text-green-600 dark:text-green-400 font-semibold text-sm mt-3">
                    ✓ Enrolled: {cls.studentsEnrolled}
                  </p>

                 
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No popular classes found.
        </p>
      )}
    </section>
  );
};

export default PopularClasses;
