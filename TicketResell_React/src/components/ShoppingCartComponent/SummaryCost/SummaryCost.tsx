import React from 'react';
import './SummaryCost.css';
import { useNavigate } from 'react-router-dom';

  interface SummaryCostProps {
    subtotal: number;
    totalQuantity: number;
    selectedItems: {
      ticketId: string;
      sellerName: string;
      quantity: number;
      sellerImg: string;
    }[];
  }

const SummaryCost: React.FC<SummaryCostProps> = ({subtotal, totalQuantity, selectedItems}) => {
  const navigate = useNavigate();
  const totalPrice = subtotal;

  const handleCheckout = () => {
    if (selectedItems.length !== 0) {
      navigate("/checkout", { state: { subtotal, totalQuantity, selectedItems } });
    }
  };

    // hiển thị định dạng tiền tệ VN
    const formatVND = (amount: number) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };

  return (
    <div className='cart-summary'>
      <h3 className='summary-title'>Tổng tiền</h3>
      <div className="summary-total">
        <span>tổng cộng*</span> {formatVND(subtotal)}
      </div>
      <div className="summary-total-quantity">
        <span>Tổng số vé*</span> {totalQuantity}
      </div>
      <div className="summary-total-amount">
        <span>Tống giá</span>  {formatVND(totalPrice)}
      </div>
      <button 
        className="check-out-btn" 
        onClick={handleCheckout}
        disabled={selectedItems.length === 0}
      >
        Xác nhận thanh toán
      </button>
    </div>
  );
};

export default SummaryCost;