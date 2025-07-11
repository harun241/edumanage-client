import React, { useState } from "react";
import Modal from "./Modal";

const AssignmentModal = ({ isOpen, onClose, onAddAssignment }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAssignment({ title, deadline, description });
    setTitle("");
    setDeadline("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Assignment Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Assignment Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Assignment Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Assignment</button>
      </form>
    </Modal>
  );
};

export default AssignmentModal;
