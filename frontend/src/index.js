import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./context/UserProvider";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
      <ToastContainer />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
