import React, { useState, useRef, useEffect } from "react";

const DashboardLayout = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        ref={sidebarRef}
        style={{ width: 200, backgroundColor: "#f0f0f0", padding: 20, position: "relative" }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <button onClick={() => setModalOpen(!modalOpen)}>Toggle Modal</button>
            {modalOpen && (
              <div
                ref={modalRef}
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "0",
                  background: "white",
                  border: "1px solid #ccc",
                  padding: "10px",
                  zIndex: 1000,
                }}
              >
                Modal Content
              </div>
            )}
          </li>
          {/* NavLinks */}
          <li>
            <a href="/dashboard/add-class">Add Class</a>
          </li>
          <li>
            <a href="/dashboard/my-class">My Class</a>
          </li>
        </ul>
      </nav>
      <main style={{ flexGrow: 1, padding: 20 }}>
        {/* Outlet or other content */}
      </main>
    </div>
  );
};

export default DashboardLayout;
