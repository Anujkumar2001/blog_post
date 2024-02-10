import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import MyContext from "./contextProvider/myContext";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyContext>
        <ToastContainer position="bottom-center" autoClose={2000}/>
        <App />
      </MyContext>
    </BrowserRouter>
  </React.StrictMode>
);
