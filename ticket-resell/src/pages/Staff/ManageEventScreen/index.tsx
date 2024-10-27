import React, { useState } from "react";
import useManageEventScreen from "./useManageEventScreen";

const ManageEventScreen: React.FC = () => {
  const {
    events,
    handleSaveEvent,
    handleManageTickets,
    isModalOpen,
    selectedEvent,
    setSelectedEvent,
    openModal,
    closeModal,
    handleSave,
  } = useManageEventScreen();
  

  return (
    <div className="w-[90%] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Sự Kiện</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="flex items-center bg-[#87CBB9] text-white hover:bg-[#B9EDDD] hover:text-black px-2 py-1 rounded-md transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tạo sự kiện
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-[#87CBB9]">
            <tr>
              <th className="p-4 border-b border-gray-300 text-left">Hình</th>
              <th className="p-4 border-b border-gray-300 text-left">Tên sự kiện</th>
              <th className="p-4 border-b border-gray-300 text-left">Thời gian</th>
              <th className="p-4 border-b border-gray-300 text-left">Địa điểm</th>
              <th className="p-4 border-b border-gray-300 text-left">Địa chỉ</th>
              <th className="p-4 border-b border-gray-300 text-left">Trạng thái</th>
              <th className="p-4 border-b border-gray-300 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.eventId}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleManageTickets()}
              >
                <td className="p-4 border-b border-gray-300">
                  <img src={event.eventImage} alt={event.eventName} className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="p-4 border-b border-gray-300">{event.eventName}</td>
                <td className="p-4 border-b border-gray-300">{event.eventTime}</td>
                <td className="p-4 border-b border-gray-300">{event.location}</td>
                <td className="p-4 border-b border-gray-300">{event.city}</td>
                <td className="p-4 border-b border-gray-300 text-green-500">
                  {event.eventStatus === "Ongoing" ? "Sắp diễn ra" : "Đã kết thúc"}
                </td>
                <td className="p-4 border-b border-gray-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(event); // Mở modal với sự kiện đã chọn
                    }}
                    className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-lg font-bold mb-4">{selectedEvent ? "Chỉnh sửa sự kiện" : "Tạo sự kiện"}</h2>
            <form>
              <input
                type="text"
                value={selectedEvent?.eventName || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, eventName: e.target.value })}
                placeholder="Tên sự kiện"
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={selectedEvent?.eventTime || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, eventTime: e.target.value })}
                placeholder="Thời gian"
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={selectedEvent?.location || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                placeholder="Địa điểm"
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                value={selectedEvent?.city || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, city: e.target.value })}
                placeholder="Địa chỉ"
                className="w-full mb-3 p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleSave}
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
  );
};

export default ManageEventScreen;
