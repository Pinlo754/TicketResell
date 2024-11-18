import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useWallet = () => {
  const [wallet, setWallet] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    fetchWallet();
    fetchUser();
  }, []);

  useEffect(() => {
    if (wallet) { // Chỉ gọi fetchTransactionHistory khi wallet đã có giá trị
      fetchTransactionHistory();
    }
  }, [wallet]);

  const fetchUser = async () => {
    try {
        const response = await axios.get("/api/Account/user-information/" + userId);
        setUser(response.data);
    } catch (error) {
        console.error("Error fetching wallet:", error);
        toast.error("Không tìm người dùng này.");
    }
  };

  const fetchWallet = async () => {
    try {
      const response = await axios.get(`/api/Wallet/get-by-user/` + userId + "?userId=" +userId );
      setWallet(response.data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
      toast.error("Không tìm thấy ví cho người dùng này.");
    }
  };

  const fetchTransactionHistory = async () => {
    if (wallet && wallet.walletId) { // Kiểm tra xem wallet đã có giá trị và có thuộc tính walletId
      try {
        const response = await axios.get("/api/Wallet/transaction-history/" + wallet.walletId +"?walletId=" + wallet.walletId);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        toast.error("Không truy xuất được giao dịch cho người dùng này.");
      }
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState(""); // 'deposit' or 'withdraw'
  const [amount, setAmount] = useState("");
  // Thêm các state mới cho thông tin tài khoản ngân hàng
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");

  // Function to handle opening modal for deposit or withdrawal
  const openModal = (type: string) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  // Function to handle form submission (mockup)
  const handleSubmit = async () => {
    if (transactionType === "deposit") {
        // xử lí VNPay
        try {
            const response = await axios.post(
              "https://localhost:7286/api/Order/deposit", {
                userId: userId,
                amount: parseInt(amount, 10),
              }              
            );
              const url = response.data.paymentUrl;
              console.log(url);
              window.open(url);
            
          } catch (error) {
            console.error(error);
          }


    try {
        const response = await axios.post('/api/Wallet/deposit?walletId=' + wallet.walletId + '&amount=' + parseInt(amount, 10));

        if (response.status === 200) {
            toast.success('Nạp tiền thành công mệnh giá ' + amount + ' VND');
        } else {
            toast.error("Giao dịch thất bại.");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Giao dịch thất bại.");
    }
} else {
  const withdrawData = {
    withDrawId: "",
    walletId: wallet.walletId,
    amount: parseInt(amount, 10),
    status: "Pending", // Trạng thái ban đầu
    bankName: bankName, // Thay thế bằng giá trị từ form của bạn
    bankAccountName: accountName, // Thay thế bằng giá trị từ form của bạn
    bankAccountNumber: accountNumber, // Thay thế bằng giá trị từ form của bạn
    transactionId: "" // Để trống vì transactionId sẽ được tạo trong API
};
try {
  // Gửi yêu cầu POST tới API `withdraw-request`
  const response = await axios.post('/api/Wallet/withdraw-request', withdrawData);

  if (response.status === 200) {
      toast.success('Yêu cầu rút tiền thành công mệnh giá ' + amount + ' VND');
  } else {
      toast.error("Giao dịch thất bại: " + response.data.message);
  }
} catch (error) {
  console.error("Error:", error);
  toast.error("Lỗi hệ thống!");
}
}

    setIsModalOpen(false);
};


  return {
    wallet,
    transactions,
    openModal,
    handleSubmit,
    isModalOpen,
    transactionType,
    amount,
    setAmount,
    setTransactionType,
    setIsModalOpen,
    user,
    setAccountNumber,
    setAccountName,
    setBankName,
    accountNumber,
    accountName,
    bankName
  };
};

export default useWallet;
