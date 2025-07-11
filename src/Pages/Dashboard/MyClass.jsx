import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ClassCard from "../../components/ClassCard";

const MyClass = () => {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

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
    alert("Update feature will come here (modal or route)");
    // তুমি modal বা অন্য route এ আপডেট ফর্ম বানাবে
  };

  const handleSeeDetails = (id) => {
    alert("Redirect to see details page for class id: " + id);
    // navigate(`/dashboard/my-class/${id}`); etc.
  };

  return (
    <div>
      <h2>My Classes</h2>
      {classes.length === 0 && <p>No classes found.</p>}
      {classes.map((cls) => (
        <ClassCard
          key={cls._id}
          classInfo={cls}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onSeeDetails={handleSeeDetails}
        />
      ))}
    </div>
  );
};

export default MyClass;
