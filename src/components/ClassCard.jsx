import React from "react";

const ClassCard = ({ classInfo, onUpdate, onDelete, onSeeDetails }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 10 }}>
      <h3>{classInfo.title}</h3>
      <p><b>Teacher:</b> {classInfo.name} ({classInfo.email})</p>
      <p><b>Price:</b> {classInfo.price}</p>
      <p><b>Description:</b> {classInfo.description}</p>
      {classInfo.image && <img src={classInfo.image} alt={classInfo.title} style={{ maxWidth: "100%" }} />}
      <p><b>Status:</b> {classInfo.status}</p>

      <button onClick={() => onUpdate(classInfo)}>Update</button>
      <button onClick={() => onDelete(classInfo._id)}>Delete</button>
      <button
        onClick={() => onSeeDetails(classInfo._id)}
        disabled={classInfo.status !== "approved"}
      >
        See Details
      </button>
    </div>
  );
};

export default ClassCard;
