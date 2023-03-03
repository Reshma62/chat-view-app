import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Index";
import Login from "./pages/Login";
import Registation from "./pages/Registation";
import Message from "./pages/Message";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import firebaseConfig from "../src/firebase.confige";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/registation",
    element: <Registation />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/message",
    element: <Message />,
  },
  {
    path: "/notification",
    element: <Notifications />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
