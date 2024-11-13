import axios from "axios";
import { useEffect, useState } from "react";

const useManageRefund = () => {

    type Wallet = {
      walletId: string;
      bankName: string;
      bankAccountName: string;
      bankAccountNumber: string;
      amount: number;
      status: string;
      withDrawId: string;
      transactionId: string;
    };

    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<string>('');
    const [withDrawId, setWithDrawId] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        fetchWallets();
      }, []);

      const fetchWallets = async () => {
        try {
          const response = await axios.get("/api/Refund/list-all-request");
          setWallets(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const handleChange = (withDrawId: string, newStatus: string) => {
        // Show confirmation popup
      const confirmUpdate = window.confirm(`Bạn có chắc chắn muốn thay đổi trạng thái không?`);
      
      if (confirmUpdate) {
        handleUpdate(withDrawId, newStatus);
      }
      }

      const handleUpdate = async (withDrawId: string, newStatus: string) => {
        try {
            const response = await axios.put(`/api/Wallet/update-withdraw-status?withDrawId=${withDrawId}&newStatus=${newStatus}`);

            if (response.status === 200) {
                alert("Cập nhật trạng thái thành công!");
                fetchWallets();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
      };

    return {
        wallets,
        handleUpdate,
        status,
        setStatus,
        withDrawId,
        setWithDrawId,
        handleChange,
    };
};

export default useManageRefund;