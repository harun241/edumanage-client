import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AddClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const classData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:3000/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classData),
      });
      const result = await res.json();
      if (result.insertedId) {
        alert("Class added successfully!");
        navigate("/dashboard/my-class");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add class");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6">Add Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.title && (
            <p className="text-red-600 mt-1 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-1 font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.price ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.price && (
            <p className="text-red-600 mt-1 text-sm">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            rows={4}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.description && (
            <p className="text-red-600 mt-1 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block mb-1 font-medium">
            Image URL
          </label>
          <input
            id="image"
            {...register("image")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
