import useManageTicket from "./useManageTicket";
import SideBar from "../../../components/AccountProfile/SideBar/SideBar";
import ScrollToTop from "../../../components/ScrollToTop";
import NavBar from "../../../components/NavBar";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import Footer from "../../../components/Footer";

const ManageTicket = () => {
  const {
    tickets,
    isModalOpen,
    selectedTicket,
    setSelectedTicket,
    setIsModalOpen,
    openTicketDetailModal,
    closeModal,
    priceChanged,
    setPriceChanged,
  } = useManageTicket();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* NAVBAR */}
      <NavBar />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />

      {/* MAIN CONTENT */}
      <div className="bg-gradient-to-b from-[#B9EDDD] to-[#569DAA] h-100vh flex flex-grow p-[20px]">
        <div className="w-[1050px] mx-auto mt-[12vh]">
          <div className="flex flex-row rounded-lg h-[83vh] bg-white shadow-xl flex">
            {/* Menu bên */}
            <div className="basic-1/3">
              <SideBar />
            </div>
            <div className="basic-2/3 grow p-6">
              {/* TICKET LIST */}
              <div className="overflow-x-auto w-full mx-auto">
                <table className="w-full bg-white border border-gray-300">
                  <thead className="bg-[#87CBB9]">
                    <tr>
                      <th className="p-4 border-b border-gray-300 text-left">
                        Tên vé
                      </th>
                      <th className="p-4 border-b border-gray-300 text-left">
                        Loại vé
                      </th>
                      <th className="p-4 border-b border-gray-300 text-left">
                        Số lượng
                      </th>
                      <th className="p-4 border-b border-gray-300 text-left">
                        Giá bán
                      </th>
                      <th className="p-4 border-b border-gray-300 text-left">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-4 text-center text-gray-500"
                        >
                          Chưa có vé nào trong hệ thống.
                        </td>
                      </tr>
                    ) : (
                      tickets.map((ticket) => (
                        <tr
                          key={ticket.ticketId}
                          className="hover:bg-gray-100 cursor-pointer"
                          onClick={() => openTicketDetailModal(ticket)}
                        >
                          <td className="p-4 border-b border-gray-300">
                            {ticket.ticketName}
                          </td>
                          <td className="p-4 border-b border-gray-300">
                            {ticket.type === "Stand" ? "Đứng" : "Ngồi"}
                          </td>
                          <td className="p-4 border-b border-gray-300">
                            {ticket.quantity}
                          </td>
                          <td className="p-4 border-b border-gray-300">
                            {ticket.price}
                          </td>
                          <td
                            className={`p-4 border-b border-gray-300 ${
                              ticket.status === "Available"
                                ? "text-green-500"
                                : ticket.status === "Pending"
                                ? "text-yellow-500"
                                : ticket.status === "Sold"
                                ? "text-gray-500"
                                : "text-red-500"
                            }`}
                          >
                            {ticket.status === "Pending"
                              ? "Chờ duyệt"
                              : ticket.status === "Available"
                              ? "Đang bán"
                              : ticket.status === "Sold"
                              ? "Đã bán"
                              : "Bị từ chối"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Modal for Ticket Details */}
              {isModalOpen && selectedTicket && (
                <div className="fixed mt-16 inset-0 bg-black bg-opacity-50 flex items-center justify-center py-10 overflow-y-auto">
                  <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">
                      Thông tin chi tiết
                    </h2>

                    {/* Form thông tin chi tiết */}
                    <form>
                      <p className="text-lg text-center font-semibold mb-4">
                        Sự Kiện
                      </p>

                      <div className="mb-4">
                        <div className="flex items-center justify-center">
                          <img
                            src={selectedTicket.event.eventImage}
                            alt="Event"
                            className="w-24 h-24 object-cover rounded mb-2 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium">Tên:</label>
                        <input
                          type="text"
                          value={selectedTicket.event.eventName}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium">Vị trí:</label>
                        <input
                          type="text"
                          value={selectedTicket.event.location}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium">Địa chỉ:</label>
                        <input
                          type="text"
                          value={selectedTicket.event.city}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>

                      <div className="mb-10 flex justify-between">
                        <div>
                          <label className="block font-medium">
                            Thời gian:
                          </label>
                          <input
                            type="text"
                            value={selectedTicket.event.eventTime}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block font-medium">
                            Trạng thái:
                          </label>
                          <input
                            type="text"
                            value={selectedTicket.event.eventStatus}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                      </div>

                      <p className="text-lg text-center font-semibold mb-4">
                        Vé
                      </p>

                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-2">
                          {selectedTicket?.images?.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Ticket ${index}`}
                              className="w-24 h-24 object-cover rounded mb-2 cursor-pointer"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium">Tên vé:</label>
                        <input
                          type="text"
                          value={selectedTicket.ticketName}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>

                      <div className="mb-4 flex justify-between">
                        <div>
                          <label className="block font-medium">Loại vé:</label>
                          <input
                            type="text"
                            value={
                              selectedTicket.type === "Stand" ? "Đứng" : "Ngồi"
                            }
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block font-medium">
                            Trạng thái:
                          </label>
                          <input
                            type="text"
                            value={
                              selectedTicket.status === "Pending"
                                ? "Chờ duyệt"
                                : selectedTicket.status === "Available"
                                ? "Đang bán"
                                : selectedTicket.status === "Sold"
                                ? "Đã bán"
                                : "Bị từ chối"
                            }
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="mb-4 flex gap-8">
                        {/* Trường Khu vực */}
                        <div className="flex-1">
                          <label className="block font-medium">Khu vực:</label>
                          <input
                            type="text"
                            value={selectedTicket.section}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>

                        {/* Trường Hàng (chỉ hiển thị khi loại vé là "Seat") */}
                        {selectedTicket.type === "Seat" && (
                          <div className="flex-1">
                            <label className="block font-medium">Hàng:</label>
                            <input
                              type="text"
                              value={selectedTicket.row}
                              disabled
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                            />
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium">Số lượng:</label>
                        <input
                          type="number"
                          value={selectedTicket.quantity}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>

                      <div className="mb-4 flex justify-between">
                        <div>
                          <label className="block font-medium">Giá gốc:</label>
                          <input
                            type="text"
                            value={selectedTicket.originPrice}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block font-medium">Giá bán:</label>
                          <input
                            type="text"
                            value={selectedTicket.price}
                            onChange={(e) => {
                              setSelectedTicket({
                                ...selectedTicket,
                                price: parseFloat(e.target.value) || 0,
                              });
                              setPriceChanged(true);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block font-medium">Mô tả:</label>
                        <input
                          type="text"
                          value={selectedTicket.description}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                        />
                      </div>

                      {/* Nút hành động */}
                      <div className="flex justify-end mt-4">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mr-2"
                        >
                          Đóng
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default ManageTicket;
