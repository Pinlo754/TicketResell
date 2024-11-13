import axios from "axios";
import { useEffect, useState } from "react";

const useManageRefund = () => {
    type Refund = {
        requestId: string;
        orderId: string;
        refundDetail: string;
        images: string[];
        status: string;
    };

    const [refunds, setRefunds] = useState<Refund[]>([]);
    const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
    const [status, setStatus] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchRefunds();
    }, []);

    const fetchRefunds = async () => {
        try {
            const response = await axios.get("/api/Refund/list-all-request");
            setRefunds(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const openDetailModal = (refund: Refund) => {
        setSelectedRefund(refund);
        setStatus(refund.status);
        setIsModalOpen(true);
    };

    const handleChange = (requestId: string, newStatus: string) => {
        const confirmUpdate = window.confirm(`Bạn có chắc chắn muốn thay đổi trạng thái không?`);
        if (confirmUpdate) {
            handleUpdate(requestId, newStatus);
        }
    };

    const handleUpdate = async (requestId: string, newStatus: string) => {
        try {
            const response = await axios.put(`/api/Refund/update-status`, {
                requestId: requestId,
                status: newStatus,
            });

            if (response.status === 200) {
                alert("Cập nhật trạng thái thành công!");
                fetchRefunds();
                setIsModalOpen(false); // Đóng modal sau khi cập nhật
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return {
        refunds,
        handleUpdate,
        status,
        setStatus,
        selectedRefund,
        handleChange,
        openDetailModal,
        isModalOpen,
        setIsModalOpen,
    };
};

export default useManageRefund;