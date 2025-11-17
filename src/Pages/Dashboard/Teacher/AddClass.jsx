import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";



const AddClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ Mutation for POST request
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (classData) => {
      const res = await axios.post("https://edumanage-server-rho.vercel.app/classes", classData, {
        headers: {
          "Content-Type": "application/json",
          "x-user-email": user?.email,
          "x-user-role": "teacher",
        },
      });
      return res.data;
    },
    onSuccess: (result) => {
      if (result.insertedId) {
      toast.success("Class added successfully!");
        reset();
        navigate("/dashboard/teacher/my-class");
      } else {
         toast.error("⚠️ Something went wrong. Class not added.");
      }
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
      alert("❌ Failed to add class.");
    },
  });

  const onSubmit = (data) => {
    const classData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
    };
    mutate(classData); // ✅ call the mutation
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Add a New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className={`w-full border rounded px-3 py-2 ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block mb-1 font-medium">Price</label>
          <input
            id="price"
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            className={`w-full border rounded px-3 py-2 ${errors.price ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            rows={4}
            {...register("description", { required: "Description is required" })}
            className={`w-full border rounded px-3 py-2 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block mb-1 font-medium">Image URL</label>
          <input
            id="image"
            {...register("image", { required: "Image URL is required" })}
            className={`w-full border rounded px-3 py-2 ${errors.image ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.image && <p className="text-red-600 text-sm">{errors.image.message}</p>}
        </div>

        {/* Readonly Fields */}
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input
            id="name"
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            id="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`mt-4 w-full px-6 py-3 text-lg font-semibold rounded-xl 
                bg-gradient-to-r from-sky-500 to-blue-700 text-white shadow-lg 
                hover:shadow-blue-400/50 transition-all duration-300 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
