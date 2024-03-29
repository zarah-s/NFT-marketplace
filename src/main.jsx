import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        position={"top-right"}
      />
      <App />
    </Theme>
  </React.StrictMode>
);
