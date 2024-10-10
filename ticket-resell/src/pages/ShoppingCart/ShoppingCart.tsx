import React from "react";
import "./ShoppingCart.css";
import TicketContent from "../../components/ShoppingCartComponent/TicketContent/TicketContent";
import SummaryCost from "../../components/ShoppingCartComponent/SummaryCost/SummaryCost";
const ShoppingCart = () => {
  return (
    <div className="cart">
      <div className="cart-wrapper">
        <div className="cart-container">
          <h2 className="section-title">Shopping Cart</h2>
          <div className="cart-items">
            <TicketContent />
          </div>
          <SummaryCost />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
