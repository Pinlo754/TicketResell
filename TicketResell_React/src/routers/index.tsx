import React from "react";
import { createBrowserRouter } from "react-router-dom";
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
import AccountProfile from "../pages/User/Account/Account";
import AdminBoard from "../pages/Admin/AdminBoard";
import TicketBoard from "../components/Admin/TicketBoard/TicketBoard";
import OrderBoard from "../components/Admin/OrderBoard/OrderBoard";
import UserBoard from "../components/Admin/UserBoard/UserBoard";
import SellScreen from "../pages/SellScreen";
import CheckOut from "../pages/CheckOutScreen/CheckOut";
import StaffMainScreen from "../pages/Staff/StaffMainScreen";
import ManageEventScreen from "../pages/Staff/ManageEventScreen";
import ManageTicketScreen from "../pages/Staff/ManageTicketScreen";
import Purchase from "../pages/User/Purchase";
import Wallet from "../pages/User/Wallet/Wallet";
import VerifyEmailResetPassword from "../pages/VerifyResetPassword/VerifyEmailScreen";
import Sale from "../pages/User/Sale";
import AboutUsScreen from "../pages/AboutUsScreen";
import HowToBuy from "../pages/HowItWorks/HowToBuy";
import HowToSell from "../pages/HowItWorks/HowToSell";
import ManageTicket from "../pages/User/ManageTicket";
import Notification from "../pages/User/Notification";
import PurchaseDetail from "../pages/User/PurchaseDetail";
import SaleDetail from "../pages/User/SaleDetail";
import OrderDetailAdmin from "../components/Admin/OrderBoard/OrderDetailAdmin";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation";
import ManageWithdraw from "../pages/Staff/ManageWithdraw";
import ManageRefund from "../pages/Staff/ManageRefund";

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
      <AppChatContextProvider>
        {" "}
        {/* Bọc AppChatContextProvider quanh Chat route */}
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
    path: "/userProfile/:userId",
    element: <UserProfile />,
  },
  {
    path: "/sell/:eventId?",
    element: <SellScreen />,
  },
  {
    path: "/profile",
    element: <AccountProfile />,
  },
  {
    path: "/Admin",
    children: [
      {
        path: "",
        element: <AdminBoard />,
      },
      {
        path: "Ticket", 
        element: <TicketBoard /> 
      },
      {
        path: "Orders",
        children:[
          {
            path:"",
            element: <OrderBoard />,
          },
          {
            path:"detail",
            element: <OrderDetailAdmin />,
          },
        ]
      },
      {
        path: "Customers",
        element: <UserBoard />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/staff",
    children: [
      {
        path: "main",
        element: <StaffMainScreen />,
      },
      {
        path: "events",
        element: <ManageEventScreen />,
      },
      {
        path: "tickets/:eventId",
        element: <ManageTicketScreen />,
      },
      {
        path: "withdraw",
        element: <ManageWithdraw />,
      },
      {
        path: "refund",
        element: <ManageRefund />,
      },
    ],
  },
  {
    path: "/user",
    children: [
      {
        path: "profile",
        element: <AccountProfile />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "manageTicket",
        element: <ManageTicket />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "purchase/orderDetail",
        element: <PurchaseDetail />,
      },
      {
        path: "sale",
        element: <Sale />,
      },
      {
        path: "sale/orderDetail",
        element: <SaleDetail />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/aboutUs",
    element: <AboutUsScreen />,
  },
  {
    path: "/how-it-works",
    children: [
      {
        path: "htb",
        element: <HowToBuy />,
      },
      {
        path: "hts",
        element: <HowToSell />,
      },
    ],
  },
  {
    path: "/verify-email-reset-password",
    element: <VerifyEmailResetPassword />,
  },
  {
    path: "/order-confirmation",
    element: <OrderConfirmation/>,
  }
]);

export default routers;
