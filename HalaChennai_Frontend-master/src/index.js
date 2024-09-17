import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";
import { UserProvider } from "./Context/Usercontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
  </UserProvider>
);

reportWebVitals();
