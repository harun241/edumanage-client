// src/context/AuthContext.jsx
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
          const res = await axios.get(`/api/users/role?email=${currentUser.email}`);
          const role = res?.data?.role || "student";
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.image,
            role,
          });
        } catch (error) {
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.image,
            role: "student",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
