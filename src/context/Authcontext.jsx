import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
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
          const idToken = await getIdToken(currentUser);

          // Get user role from backend
          const res = await axios.get(
            `https://edumanage-server-rho.vercel.app/api/users/role?email=${currentUser.email}`
          );
          const role = res?.data?.role || "student";

          const newUser = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
            role,
            token: idToken,
          };

          setUser(newUser);

          // Save JWT token and user info to localStorage
          localStorage.setItem("edu-user", JSON.stringify(newUser));
        } catch (err) {
          console.error("User setup error:", err);
          setUser({
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL || "",
            role: "student",
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

  // ✅ Return a Promise so .then() works in calling components
  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("edu-user");
      })
      .catch((err) => {
        console.error("Logout error:", err);
        throw err;
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
