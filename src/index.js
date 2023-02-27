import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Index';
import Login from './pages/Login';
import Registation from './pages/Registation';
import Message from "./pages/Message";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />

  </React.StrictMode>
);


