import React, { useState } from "react";
import "./ShoppingCart.css";
import TicketContent from "../../components/ShoppingCartComponent/TicketContent/TicketContent";
import SummaryCost from "../../components/ShoppingCartComponent/SummaryCost/SummaryCost";
import { motion } from "framer-motion";
import NavBar from "../../components/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ShoppingCart = () => {
  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    totalQuantity: 0,
    selectedItems: [] as {
      ticketId: string;
      sellerName: string;
      quantity: number;
      sellerImg: string;
    }[],
  });

  const handleTotalChange = (
    subtotal: number,
    totalQuantity: number,
    selectedItems: {
      ticketId: string;
      sellerName: string;
      quantity: number;
      sellerImg: string;
    }[]
  ) => {
    setCartTotals({ subtotal, totalQuantity, selectedItems });
  };

  return (
    <div className="cart">
      <ToastContainer/>
      <div className="navbar">
        <NavBar />
      </div>
      <div className="cart-wrapper">
        <h2 className="section-title">Giỏ hàng</h2>
        <motion.div
          className="cart-container"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="cart-items">
            <TicketContent onTotalChange={handleTotalChange} />
          </div>

          <div className="summary">
            <SummaryCost
              subtotal={cartTotals.subtotal}
              totalQuantity={cartTotals.totalQuantity}
              selectedItems={cartTotals.selectedItems}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ShoppingCart;
