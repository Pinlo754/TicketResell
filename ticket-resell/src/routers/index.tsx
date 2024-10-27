import React from "react";
import {createBrowserRouter } from "react-router-dom";
import WelcomeScreen from "../pages/WelcomeScreen";
import MainScreen from "../pages/MainScreen";
import Chat from "../pages/Chat/Chat";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import ListEvent from "../pages/ListEvent";
import EventDetail from "../pages/EventDetail";
import TicketDetail from "../pages/TicketDetail";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen/RegisterScreen";
import ResetPasswordScreen from "../pages/ResetPasswordScreen";
import VerifyEmailScreen from "../pages/VerifyEmailScreen/VerifyEmailScreen";
import UserProfile from "../pages/UserProfile";
import AppChatContextProvider from "../context/AppChatContext";
import AccountProfile from "../pages/Account/Account"
import AdminBoard from "../pages/Admin/AdminBoard";
import TicketBoard from "../components/Admin/Ticket/TicketBoard";
import OrderBoard from "../components/Admin/OrderBoard/OrderBoard";
import UserBoard from "../components/Admin/UserBoard/UserBoard";
import SellScreen from "../pages/SellScreen";
import CheckOut from "../pages/CheckOutScreen/CheckOut";
import StaffMainScreen from "../pages/Staff/StaffMainScreen";
import ManageEventScreen from "../pages/Staff/ManageEventScreen";
import ManageTicketScreen from "../pages/Staff/ManageTicketScreen";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/main",
    element: <MainScreen />,
  },
  {
    path: "/chat",
    element: (
      <AppChatContextProvider> {/* Bọc AppChatContextProvider quanh Chat route */}
        <Chat />
      </AppChatContextProvider>
    ),
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
    path: "/eventDetail/:eventId",
    element: <EventDetail />,
  },
  {
    path: "/ticketDetail/:eventId?/:ticketId",
    element: <TicketDetail />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordScreen />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailScreen />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
  {
    path: "/sell/:eventId?",
    element: <SellScreen />,
  },
  {
    path: "/profile",
    element: <AccountProfile/>,
  },
  {
    path: "/Admin",
    element: <AdminBoard/>,
  },
  {
    path: "/Admin/Ticket",
    element: <TicketBoard/>,
  },
  {
    path: "/Admin/Orders",
    element: <OrderBoard/>,
  },
  {
    path: "/Admin/Customers",
    element: <UserBoard/>,
  },
  {
    path: "/checkout",
    element: <CheckOut/>,
  },
  {
    path: "/staff/main",
    element: <StaffMainScreen/>,
  },
  {
    path: "/staff/events",
    element: <ManageEventScreen/>,
  },
  {
    path: "/staff/tickets/:eventId",
    element: <ManageTicketScreen />,
  },
]);

export default routers;