import React from "react";
import {createBrowserRouter } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import MainScreen from "../pages/MainScreen";
import Chat from "../pages/Chat/Chat";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import ListEvent from "../pages/ListEvent";
import EventDetail from "../pages/EventDetail";
import TicketDetail from "../pages/TicketDetail";
import UserProfile from "../pages/UserProfile";

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
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
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
]);

export default routers;
