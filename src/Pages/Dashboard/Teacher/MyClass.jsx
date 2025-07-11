import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";


const MyClass = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/classes?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch(console.error);
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this class?")) return;
    try {
      const res = await fetch(`http://localhost:3000/classes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setClasses(classes.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = (classInfo) => {
    setEditingClass(classInfo);
    setFormData({
      title: classInfo.title,
      price: classInfo.price,
      description: classInfo.description,
      image: classInfo.image,
    });
  };

  const handleSeeDetails = (id, status) => {
    if (status !== "approved") return;
    alert(`Redirecting to see details of class: ${id}`);
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/classes/${editingClass._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        alert("✅ Class updated successfully!");
        const updated = classes.map((cls) =>
          cls._id === editingClass._id ? { ...cls, ...formData } : cls
        );
        setClasses(updated);
        setEditingClass(null);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update class.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">My Classes</h2>

      {classes.length === 0 && <p>No classes found.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-lg border shadow p-4 space-y-3"
          >
            {/* Image */}
            {cls.image && (
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover rounded-md border"
              />
            )}

            {/* Info */}
            <h3 className="text-2xl font-semibold text-gray-800">
              {cls.title}
            </h3>
            <p className="text-gray-700 font-medium">
              Teacher: {cls.name} ({cls.email})
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Price:</span> ${cls.price}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Description:</span>{" "}
              {cls.description}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded text-sm ${
                  cls.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : cls.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {cls.status}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleUpdate(cls)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(cls._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                disabled={cls.status !== "approved"}
                onClick={() => handleSeeDetails(cls._id, cls.status)}
                className={`px-4 py-2 rounded ${
                  cls.status === "approved"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-md space-y-4 relative">
            <h2 className="text-xl font-bold">Update Class</h2>

            <div>
              <label className="block font-semibold">Title</label>
              <input
                className="w-full border p-2 rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: parseFloat(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block font-semibold">Description</label>
              <textarea
                className="w-full border p-2 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block font-semibold">Image URL</label>
              <input
                className="w-full border p-2 rounded"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                onClick={() => setEditingClass(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClass;
