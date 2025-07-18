import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopRatedClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/classes/top-rated')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-center mb-6">🌟 Top Rated Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes.map(cls => (
          <div key={cls._id} className="border rounded-xl p-4 shadow-lg">
            <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{cls.title}</h3>
            <p className="text-gray-600">⭐ {cls.rating || "4.9"} / 5</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedClasses;
