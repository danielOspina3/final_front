import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { MainBoard } from "../../componet/MainBoard";
import { Login } from "../../view/auth/shared/Login";
import {index} from "../../view/public/Index"
import {Conocenos} from "../../view/public/Conocenos";
import { Guard } from "../../segurity/Guard";

const LazyMainBoard = lazy(() =>
  import("../../componet/MainBoard").then(() => ({ default: MainBoard }))
);

const LazyLogin = lazy(() =>
  import("../../view/auth/shared/Login").then(() => ({ default: Login }))
);
const LazyIndex = lazy(() =>
  import("../../view/public/Index").then(() => ({ default: index }))
);
const LazyConocenos = lazy(() =>
  import("../../view/public/Conocenos").then(() => ({ default: Conocenos }))
);

export const CompleteRouting = () => {
  return (
    <Routes>
      <Route element={<Guard />}>
        <Route path="/home/*" element={<LazyMainBoard />} />
      </Route>
      <Route path="/Conocenos" element={<LazyConocenos />} />
      <Route path="/login" element={<LazyLogin />} />
      <Route path="/" element={<LazyIndex />} />


    </Routes>
  );
};
