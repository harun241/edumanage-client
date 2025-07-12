import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";
import { auth } from "../../Firebase.config";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get user role from backend
          const res = await axios.get(`http://localhost:3000/api/users/role?email=${currentUser.email}`);
          const role = res?.data?.role || "student";

          // Set user state
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
            role,
          });

          // Optional: Store to localStorage
          localStorage.setItem(
            "edu-user",
            JSON.stringify({
              email: currentUser.email,
              role,
            })
          );
        } catch (err) {
          console.error("Failed to fetch user role:", err.message);
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
            role: "student", // fallback
          });
        }
      } else {
        setUser(null);
        localStorage.removeItem("edu-user");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("edu-user");
        // Optional: toast.success("Logged out")
      })
      .catch((err) => {
        console.error("Logout error:", err);
        // Optional: toast.error("Logout failed")
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
