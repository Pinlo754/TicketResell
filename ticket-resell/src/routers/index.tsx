import React from "react";
import {createBrowserRouter } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import MainScreen from "../pages/MainScreen";
import ListEvent from "../pages/ListEvent";
import EventDetail from "../pages/EventDetail";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/main",
    element: <MainScreen />,
  },
  {
    path: "/listEvent",
    element: <ListEvent />,
  },
  {
    path: "/eventDetail",
    element: <EventDetail />,
  },
]);

export default routers;
