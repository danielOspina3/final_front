import { InternalRouting } from "../utils/router/AppRouter";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { RockyHeader } from "../view/private/main/RockyHeader";

export const MainBoard = () => {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className=" page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper ">
            <InternalRouting />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
