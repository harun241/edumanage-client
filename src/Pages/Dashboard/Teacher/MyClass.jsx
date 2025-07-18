import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BACKEND = "http://localhost:3000";

const MyClass = () => {
  const { user } = useAuth(); // Assuming user has name, email, role
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`${BACKEND}/classes?email=${user.email}`, {
        headers: {
          "x-user-email": user.email,
          "x-user-role": user.role || "teacher",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setClasses(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching classes:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BACKEND}/classes/${id}`, {
          method: "DELETE",
          headers: {
            "x-user-email": user.email,
            "x-user-role": user.role || "teacher",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Class has been deleted.", "success");
              setClasses(classes.filter((cls) => cls._id !== id));
            } else {
              Swal.fire("Error", "Failed to delete the class.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the class.", "error");
          });
      }
    });
  };

  const handleUpdate = () => {
    if (
      !selectedClass.title ||
      !selectedClass.price ||
      isNaN(Number(selectedClass.price))
    ) {
      Swal.fire(
        "Validation Error",
        "Please provide a valid title and price.",
        "warning"
      );
      return;
    }

    fetch(`${BACKEND}/classes/${selectedClass._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": user.email,
        "x-user-role": user.role || "teacher",
      },
      body: JSON.stringify({
        ...selectedClass,
        price: Number(selectedClass.price),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Class info updated.", "success");
          setClasses((prev) =>
            prev.map((cls) => (cls._id === selectedClass._id ? selectedClass : cls))
          );
          setSelectedClass(null);
        } else {
          Swal.fire("Error", "Failed to update the class.", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error", "Failed to update the class.", "error");
      });
  };

  if (loading) {
    return <div className="text-center py-10">Loading classes...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Classes</h2>
      {classes.length === 0 ? (
        <p className="text-center">No classes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div
              key={cls._id}
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {cls.image ? (
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-1">{cls.title}</h3>
                <p className="mb-1">
                  <span className="font-semibold">Teacher:</span> {user.name}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className="mb-1">
                  <span className="font-semibold">Price:</span> ${cls.price}
                </p>
                <p className="mb-2">{cls.description}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      cls.status === "approved"
                        ? "text-green-600"
                        : cls.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {cls.status}
                  </span>
                </p>

                <div className="mt-auto flex gap-2 pt-4">
                  <button
                    onClick={() => setSelectedClass(cls)}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded flex-1"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded flex-1"
                  >
                    Delete
                  </button>
                  <button
                    disabled={cls.status !== "approved"}
                    onClick={() => navigate(`/dashboard/teacher/my-classes/${cls._id}`)}
                    className={`px-3 py-1 flex-1 text-white rounded ${
                      cls.status === "approved"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 max-w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Update Class</h2>
            <input
              className="w-full mb-2 p-2 border rounded"
              value={selectedClass.title}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, title: e.target.value })
              }
              placeholder="Class Title"
            />
            <input
              className="w-full mb-2 p-2 border rounded bg-gray-100 cursor-not-allowed"
              value={user.name}
              disabled
              placeholder="Teacher Name"
            />
            <input
              className="w-full mb-2 p-2 border rounded bg-gray-100 cursor-not-allowed"
              value={user.email}
              disabled
              placeholder="Teacher Email"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              type="number"
              value={selectedClass.price}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, price: e.target.value })
              }
              placeholder="Price"
            />
            <textarea
              className="w-full mb-2 p-2 border rounded"
              value={selectedClass.description}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, description: e.target.value })
              }
              placeholder="Description"
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              value={selectedClass.image}
              onChange={(e) =>
                setSelectedClass({ ...selectedClass, image: e.target.value })
              }
              placeholder="Image URL"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-3 py-1 bg-blue-600 text-white rounded"
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
