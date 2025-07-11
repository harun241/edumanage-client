import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import getUserRole from "../utils/getUserRole";
const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      getUserRole(user.email).then(fetchedRole => {
        setRole(fetchedRole);
        setRoleLoading(false);
      });
    }
  }, [user]);

  if (loading || roleLoading) return <div>Loading...</div>;

  return allowedRoles.includes(role) ? children : <Navigate to="/" />;
};

export default RoleBasedRoute;
