import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../Firebase.config";



const Authcontext = createContext(null);

// Custom Hook
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

    return () => unsubscribe();
  }, []);

  const authInfo = { user, loading };

  return (
    <Authcontext.Provider value={authInfo}>
      {!loading && children}
    </Authcontext.Provider>
  );
};
export default Authcontext;