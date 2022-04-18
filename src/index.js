import React from "react";
import ReactDOM from "react-dom";
import { UserContext } from "./context/UserContext";
import { App } from "./components";
ReactDOM.render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>,
  document.getElementById("app")
);
