import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { lazy } from "react";
import { Login } from "./Login";

const LazyUserView = lazy(() =>
  import("./Login").then(() => ({ default: Login }))
);

export const AuthRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth/login" element={<LazyUserView />} />
      {/* <Route path="/signup" element={<Signup />} /> */}

      {/* Protected route example */}

      {/* Redirect from root or any undefined route */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};
