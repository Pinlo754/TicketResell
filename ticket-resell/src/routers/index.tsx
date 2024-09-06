import React from "react";
import {createBrowserRouter } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import MainScreen from "../pages/MainScreen";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/main",
    element: <MainScreen />,
  },
]);

export default routers;
