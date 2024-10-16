import React from "react";
import "./ShoppingCart.css";
import TicketContent from "../../components/ShoppingCartComponent/TicketContent/TicketContent";
import SummaryCost from "../../components/ShoppingCartComponent/SummaryCost/SummaryCost";
import { motion } from "framer-motion";
import NavBar from "../../components/NavBar";

const ShoppingCart = () => {
  return (
    <div className="cart">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="cart-wrapper">
        <h2 className="section-title">Shopping Cart</h2>
        <motion.div
          className="cart-container"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="cart-items">
            <TicketContent />
            <TicketContent />
            <TicketContent />
            <TicketContent />
            <TicketContent />
          </div>

          <div className="summary">
            <SummaryCost />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShoppingCart;
