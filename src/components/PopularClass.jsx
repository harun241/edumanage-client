import React, { useEffect, useState } from "react";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const PopularClasses = () => {
  const [popular, setPopular] = useState([]);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1 },
      },
    },
  });

  useEffect(() => {
    axios.get("http://localhost:3000/classes/popular")
      .then((res) => setPopular(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold text-center mb-6">🔥 Popular Classes</h2>
      <div ref={sliderRef} className="keen-slider">
        {popular.map(cls => (
          <div key={cls._id} className="keen-slider__slide bg-white rounded-xl shadow p-4">
            <img src={cls.image} alt={cls.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-3">{cls.title}</h3>
            <p className="text-sm text-gray-600">👥 Enrolled: {cls.enrolled || 0}</p>
            <p className="text-sm text-gray-500">⭐ Rating: {cls.rating || 4.9}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularClasses;
