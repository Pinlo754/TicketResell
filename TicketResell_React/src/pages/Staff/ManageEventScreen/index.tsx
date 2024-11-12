import React, { useState } from "react";
import useManageEventScreen from "./useManageEventScreen";
import StaffNavBar from "../../../components/StaffNavBar";
import Footer from "../../../components/Footer";
import ScrollToTopButton from "../../../components/ScrollToTopButton";
import ScrollToTop from "../../../components/ScrollToTop";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageEventScreen = () => {
  const {
    navigate,
    events,
    handleSaveEvent,
    isModalOpen,
    selectedEvent,
    setSelectedEvent,
    openModal,
    closeModal,
    handleSave,
    sendImage,
  } = useManageEventScreen();
  

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* NAVBAR */}
      <StaffNavBar />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />

      <ToastContainer/>

      {/* MAIN CONTENT */}
      <div className="w-full flex-grow mt-24">
        <div className="w-[90%] mx-auto p-4">
          <h1 className="text-4xl font-bold mb-6">Quản Lý Sự Kiện</h1>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => openModal()}
              className="flex items-center bg-[#87CBB9] text-white hover:bg-[#B9EDDD] hover:text-black px-2 py-1 rounded-md transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Tạo sự kiện
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-[#87CBB9]">
                <tr>
                  <th className="p-4 border-b border-gray-300 text-left">Hình</th>
                  <th className="p-4 border-b border-gray-300 text-left">
                    Tên sự kiện
                  </th>
                  <th className="p-4 border-b border-gray-300 text-left">
                    Thời gian
                  </th>
                  <th className="p-4 border-b border-gray-300 text-left">
                    Địa điểm
                  </th>
                  <th className="p-4 border-b border-gray-300 text-left">
                    Địa chỉ
                  </th>
                  <th className="p-4 border-b border-gray-300 text-left">
                    Trạng thái
                  </th>
                  <th className="p-4 border-b border-gray-300 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.eventId}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/staff/tickets/${event.eventId}`)}
                  >
                    <td className="p-4 border-b border-gray-300">
                      <img
                        src={event.eventImage}
                        alt={event.eventName}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      {event.eventName}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      {event.eventTime}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      {event.location}
                    </td>
                    <td className="p-4 border-b border-gray-300">{event.city}</td>
                    <td
                      className={`p-4 border-b border-gray-300 ${
                        event.eventStatus === "Ongoing"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {event.eventStatus === "Ongoing"
                        ? "Sắp diễn ra"
                        : "Đã kết thúc"}
                    </td>
                    <td className="p-4 border-b border-gray-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(event); // Mở modal với sự kiện đã chọn
                        }}
                        className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
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
            <div className="fixed inset-0 mt-20 bg-black bg-opacity-50 flex items-center justify-center py-10 overflow-y-auto">
              <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  {!selectedEvent?.eventId ? "Tạo sự kiện" : "Chỉnh sửa sự kiện"}
                </h2>
                <form>
                  <label className="block mb-3">
                    <input
                      type="file"
                      id="avatar"
                      accept=".png, .jpg, .jpeg"
                      hidden
                      onChange={(e) => sendImage(e)}
                    />
                    <div className="flex flex-col items-center">
                      <img
                        src={
                          selectedEvent?.eventImage ||
                          "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
                        }
                        alt=""
                        className="w-24 h-24 object-cover rounded mb-2 cursor-pointer"
                      />
                      <span className="text-blue-500 cursor-pointer">
                        Cập nhật hình ảnh
                      </span>
                    </div>
                  </label>
                  <label className="block mb-1">Tên sự kiện:</label>
                  <input
                    type="text"
                    value={selectedEvent?.eventName || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        eventName: e.target.value,
                      })
                    }
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  
                  {/* 
                  <label className="block mb-1">Thời gian:</label>
                  <input
                    type="datetime-local"
                    value={selectedEvent?.eventTime || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        eventTime: e.target.value,
                      })
                    }
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  */}

                  <label className="block mb-1">Địa điểm:</label>
                  <input
                    type="text"
                    value={selectedEvent?.location || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        location: e.target.value,
                      })
                    }
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  <label className="block mb-1">Địa chỉ:</label>
                  <input
                    type="text"
                    value={selectedEvent?.city || ""}
                    onChange={(e) =>
                      setSelectedEvent({ ...selectedEvent, city: e.target.value })
                    }
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  />
                  <select
                    value={selectedEvent?.eventStatus || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        eventStatus: e.target.value,
                      })
                    }
                    required
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                  >
                    <option value="" disabled>
                      Chọn trạng thái
                    </option>
                    <option value="Ongoing">Sắp diễn ra</option>
                    <option value="Closed">Đã kết thúc</option>
                  </select>
                  <div className="flex justify-end space-x-2 mt-4">
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
    </div>
    {/* FOOTER */}
    <div className="flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default ManageEventScreen;
