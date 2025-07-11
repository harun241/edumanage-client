import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../../Firebase.config"; // Make sure the path is correct

// Create context
const Authcontext = createContext(null);

// Custom Hook (can be in separate file if needed)
export const useAuth = () => useContext(Authcontext);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const logOut = () => signOut(auth); // Logout function

  const authInfo = { user, loading, logOut };

  return (
    <Authcontext.Provider value={authInfo}>
      {!loading && children}
    </Authcontext.Provider>
  );
};

export default Authcontext;
