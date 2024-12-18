import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ViewIps } from "../../view/private/ips/viewIps";
import { CreateUser } from "../../view/private/user/CreateUser";
import { ViewUser } from "../../view/private/user/ViewUser";
import { UpdateUser } from "../../view/private/user/UpdateUser";
import { ViewSupport } from "../../view/private/support/ViewSupport";
import { CreateSupport } from "../../view/private/support/CreateSupport";
import { ViewSupportFinal } from "../../view/private/support/ViewSupport_final";
import { MainBoard } from "../../componet/MainBoard";
import { RockyHeader } from "../../view/private/main/RockyHeader";
import { ViewSupportMY } from "../../view/private/support/VierwMySupports";

// const LazyLogin = lazy(() =>
//   import("../../view/auth/shared/Login").then(() => ({ default: Login }))
// );

// import { CREATE_USER } from "../../view/private/user/Create"

// const LazyProfessionalCreate =lazy(()=>import("../../view/private/user/Create").then(()=>({default:CreateProfessional})));
const LazyIPSView = lazy(() =>
  import("../../view/private/ips/viewIps").then(() => ({ default: ViewIps }))
);
const LazyUserCreate = lazy(() =>
  import("../../view/private/user/CreateUser").then(() => ({
    default: CreateUser,
  }))
);

const Lazymain = lazy(() =>
  import("../../view/private/main/RockyHeader").then(() => ({
    default: RockyHeader,
  }))
);

const LazyUserView = lazy(() =>
  import("../../view/private/user/ViewUser").then(() => ({
    default: ViewUser,
  }))
);
const LazyUserUpdate = lazy(() =>
  import("../../view/private/user/UpdateUser").then(() => ({
    default: UpdateUser,
  }))
);

const LazySupportView = lazy(() =>
  import("../../view/private/support/ViewSupport").then(() => ({
    default: ViewSupport,
  }))
);

const LazySupportViewFinal = lazy(() =>
  import("../../view/private/support/ViewSupport_final").then(() => ({
    default: ViewSupportFinal,
  }))
);

const LazySupportCreate = lazy(() =>
  import("../../view/private/support/CreateSupport").then(() => ({
    default: CreateSupport,
  }))
);

const LazyupportMySupport = lazy(() =>
  import("../../view/private/support/VierwMySupports").then(() => ({
    default: ViewSupportMY,
  }))
);
export const InternalRouting = () => {
  return (
    <Routes>
      {/* <Route path="/professional-view" element={<LazyProfessionalView/>}/> */}
      <Route path="/ips-view" element={<LazyIPSView />} />
      <Route path="/main" element={<Lazymain />} />
      <Route path="/create-user" element={<LazyUserCreate />} />
      <Route path="/view-user" element={<LazyUserView />} />
      <Route path="/update-user" element={<LazyUserUpdate />} />
      <Route path="/support-view" element={<LazySupportView />} />
      <Route path="/support-view-final" element={<LazySupportViewFinal />} />
      <Route path="/create-support" element={<LazySupportCreate />} />
      <Route path="/view-mysupport" element={<LazyupportMySupport />} />

      <Route />
    </Routes>
  );
};
