import React, { Suspense } from "react";
import "./App/App.scss";
import { BrowserRouter } from "react-router-dom";
import { CompleteRouting } from "./App/utils/router/CompleteRouting";

const loading = (
  <div className="justify-content-center align-item-center">
    <div className="spinner"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <CompleteRouting />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
