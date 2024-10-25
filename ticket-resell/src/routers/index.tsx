import React from "react";
import {createBrowserRouter } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import MainScreen from "../pages/MainScreen";
import ListEvent from "../pages/ListEvent";
import EventDetail from "../pages/EventDetail";
import TicketDetail from "../pages/TicketDetail";
import UserProfile from "../pages/UserProfile";
import Sell from "../pages/Sell";

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
  {
    path: "/ticketDetail",
    element: <TicketDetail />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
  {
    path: "/sell",
    element: <Sell />,
  },
]);

export default routers;
