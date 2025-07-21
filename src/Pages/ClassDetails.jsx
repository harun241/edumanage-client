import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const BACKEND = "https://edumanage-server-rho.vercel.app";

const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClass = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND}/classes/${id}`);
        setClassInfo(res.data);
      } catch (err) {
        setError("Failed to load class details.");
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading class details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!classInfo) return <p className="text-center text-red-500">Class not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <img
        src={classInfo.image || "/default.jpg"}
        alt={classInfo.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{classInfo.title}</h2>
      <p className="text-gray-600 mb-1">Teacher: {classInfo.name}</p>
      <p className="text-gray-600 mb-3">Email: {classInfo.email}</p>
      <p className="mb-4">{classInfo.description}</p>
      <p className="text-xl font-semibold mb-4">Price: ${classInfo.price}</p>

      <button
  onClick={() => {
    if (!user) {
      alert("Please login to proceed with payment");
      navigate("/auth/login");
      return;
    }
    navigate(`/dashboard/student/payment/${classInfo._id}`);
  }}
  className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
>
  Pay
</button>

    </div>
  );
};

export default ClassDetails;
