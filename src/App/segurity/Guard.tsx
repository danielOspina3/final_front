import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
type propsGuard = { children?: any };

export const Guard = ({ children }: propsGuard) => {
  const userToken = localStorage.getItem("access");
  if (userToken) {
    try {
      jwtDecode(userToken);
    } catch (error) {
      <Navigate to="/" replace />;
    }
  } else {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
