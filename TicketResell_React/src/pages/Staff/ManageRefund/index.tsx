import StaffNavBar from "../../../components/StaffNavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import useManageRefund from "./useManageRefund";

const ManageRefund = () => {
    const {
        refunds,
        status,
        setStatus,
        handleChange,
        openDetailModal,
        isModalOpen,
        setIsModalOpen,
        selectedRefund,
    } = useManageRefund();

    return (
        <div className="w-screen min-h-screen flex flex-col">
            <ScrollToTop />
            <StaffNavBar />
            <ScrollToTopButton />

            <div className="w-full flex-grow mt-24">
                <div className="w-[90%] mx-auto p-4">
                    <h1 className="text-4xl font-bold mb-6">Duyệt Hoàn Tiền</h1>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-[#87CBB9]">
                                <tr>
                                    <th className="p-4 border-b border-gray-300 text-left">Id</th>
                                    <th className="p-4 border-b border-gray-300 text-left">Đơn</th>
                                    <th className="p-4 border-b border-gray-300 text-left">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {refunds.map((refund) => (
                                    <tr
                                        key={refund.requestId}
                                        className="hover:bg-gray-100 cursor-pointer"
                                        onClick={() => openDetailModal(refund)}
                                    >
                                        <td className="p-4 border-b border-gray-300">{refund.requestId}</td>
                                        <td className="p-4 border-b border-gray-300">{refund.orderId}</td>
                                        <td
                                            className={`p-4 border-b border-gray-300 ${
                                                refund.status === "Pending"
                                                    ? "text-yellow-500"
                                                    : refund.status === "Complete"
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {refund.status === "Pending"
                                                ? "Chờ duyệt"
                                                : refund.status === "Complete"
                                                ? "Duyệt"
                                                : "Từ chối"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal chi tiết yêu cầu hoàn tiền */}
            {isModalOpen && selectedRefund && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
                    <div className="bg-white p-6 rounded-md w-1/3 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
                        <p className="mb-2"><span className="font-medium">Mã đơn:</span> {selectedRefund.orderId}</p>
                        <p><span className="font-medium">Ảnh:</span></p>

                        <div className="w-full flex items-center mx-auto gap-2 overflow-x-auto">
                          {selectedRefund.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Ticket ${index}`}
                              className="w-24 h-24 object-cover rounded mb-2 cursor-pointer"
                              onClick={() => window.open(image)}
                            />
                          ))}
                        </div>
                        
                        <p className="mb-1 font-medium">Chi tiết:</p>
                        <p className="mb-2">{selectedRefund.refundDetail}</p>

                        <label className="block mt-4 mb-2 font-medium">Trạng thái</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Pending">Chờ duyệt</option>
                            <option value="Complete">Duyệt</option>
                            <option value="Cancled">Từ chối</option>
                        </select>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mr-2 px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => handleChange(selectedRefund.requestId, status)}
                                className="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ManageRefund;