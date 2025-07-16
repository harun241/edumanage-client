import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";


const BACKEND = "http://localhost:3000";

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND}/classes`);
        setClasses(res.data);
      } catch (err) {
        setError("Failed to load classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);
    if (loading) return <Loader></Loader>;

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!classes.length) return <p className="text-center">No classes found.</p>;

  return (
   <div>
    <h1 className="font-bold text-center text-4xl ">All Classes</h1>
     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     
      {classes.map((cls) => (
        <div key={cls._id} className="border rounded p-4 shadow">
          
          <img
            src={cls.image}
            alt={cls.title}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="font-semibold text-lg">{cls.title}</h3>
          <p>Teacher: {cls.name}</p>
          <p>Price: ${cls.price}</p>

          <Link
            to={`/all-classes/class/${cls._id}`}
            className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enroll Now
          </Link>
          
        </div>
      ))}
    </div>
   </div>
  );
};

export default AllClasses;
