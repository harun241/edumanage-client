import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 8, minWidth: 300 }}>
        <button onClick={onClose} style={{ float: "right" }}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
