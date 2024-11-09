import React, { useState } from "react";
import useManageTicketScreen from "./useManageTicketScreen";
import StaffNavBar from "../../../components/StaffNavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";

const ManageTicketScreen = () => {
  const {
    navigate,
    sellerName,
    tickets,
    event,
    handleSaveTicketStatus,
    isModalOpen,
    selectedTicket,
    setSelectedTicket,
    openTicketDetailModal,
    closeModal,
  } = useManageTicketScreen();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* NAVBAR */}
      <StaffNavBar />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />

      {/* MAIN CONTENT */}
      <div className="w-full flex-grow mt-24">
        <div className="w-[90%] mx-auto p-4">
          {/* Navigate */}
          <div
            className="flex gap-1 items-center group cursor-pointer"
            onClick={() => navigate("/staff/events")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#87CBB9] transition-transform duration-300 group-hover:-translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            <p className="text-[#87CBB9] text-lg font-semibold">Quản lý sự kiện</p>
          </div>
          <h1 className="text-4xl font-bold mt-1 mb-6">Quản Lý Vé</h1>

          {/* EVENT INFO */}
          <div className="border-4 p-4 mb-6 w-fit">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 pr-1 text-red-600 cursor-pointer"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <p className="text-red-600 font-medium">{event?.eventTime}</p>
            </div>
            <h3 className="font-bold text-xl mt-1 text-ellipsis whitespace-nowrap overflow-hidden">
              {event?.eventName}
            </h3>
            <div className="flex text-sm text-gray-600 mt-2">
              {/* Location */}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>{event?.location}</p>
              </div>
              {/* City */}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-1 ml-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>{event?.city}</p>
              </div>
            </div>
          </div>

          {/* TICKET LIST */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
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
                    Người bán
                  </th>
                  <th className="p-4 border-b border-gray-300 text-left">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
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
                      <td className="p-4 border-b border-gray-300">
                        {ticket.userId}
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
              <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Thông tin vé</h2>

                {/* Form thông tin vé */}
                <form>
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
                    <label className="block font-semibold">Tên vé:</label>
                    <input
                      type="text"
                      value={selectedTicket.ticketName}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Loại vé:</label>
                    <input
                      type="text"
                      value={selectedTicket.type === "Stand" ? "Đứng" : "Ngồi"}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Khu vực:</label>
                    <input
                      type="text"
                      value={selectedTicket.section}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  {selectedTicket.type === "Seat" && (
                    <div className="mb-4">
                      <label className="block font-semibold">Hàng:</label>
                      <input
                        type="text"
                        value={selectedTicket.row}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block font-semibold">Số lượng:</label>
                    <input
                      type="number"
                      value={selectedTicket.quantity}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Giá gốc:</label>
                    <input
                      type="text"
                      value={selectedTicket.originPrice}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Giá bán:</label>
                    <input
                      type="text"
                      value={selectedTicket.price}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Người bán:</label>
                    <input
                      type="text"
                      value={selectedTicket.userId}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold">Mô tả:</label>
                    <input
                      type="text"
                      value={selectedTicket.description}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    />
                  </div>

                  {/* Dropdown cho Trạng thái */}
                  <div className="mb-4">
                    <label className="block font-semibold">Trạng thái:</label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) =>
                        setSelectedTicket({
                          ...selectedTicket,
                          status: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="Pending">Chờ duyệt</option>
                      <option value="Available">Đang bán</option>
                      <option value="Sold">Đã bán</option>
                      <option value="Cancelled">Bị từ chối</option>
                    </select>
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
                    <button
                      onClick={() => handleSaveTicketStatus(selectedTicket)}
                      type="button"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ManageTicketScreen;