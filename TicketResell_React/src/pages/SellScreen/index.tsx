import React from "react";
import ProgressBar from "../../components/ProgressBar";
import useSell, { Event } from "./useSellScreen";
import Search from "../../components/Search";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";
import {ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellScreen: React.FC = () => {
  const {
    events,
    step,
    selectedEvent,
    setSelectedEvent,
    handleEventSelect,
    eventFilter,
    ticketInfo,
    showRow,
    setShowRow,
    goNext,
    goBack,
    handleTicketInfoChange,
    handleImageUpload,
    handleSubmit,
    formatCurrency,
  } = useSell();

  const renderEvent = (event: Event) => (
    <div className="relative p-2">
      {/* Sự kiện được chọn hiển thị dấu X */}
      {selectedEvent && selectedEvent.eventName === event.eventName && (
        <button
          className="absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation(); // Để ngăn việc trigger chọn lại sự kiện
            setSelectedEvent(null); // Hủy chọn sự kiện
          }}
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
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
        <p className="text-red-600 font-medium">{event.eventTime}</p>
      </div>
      <h3 className="font-bold text-xl mt-1 text-ellipsis whitespace-nowrap overflow-hidden">
        {event.eventName}
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
          <p>{event.location}</p>
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
          <p>{event.city}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* NAVBAR */}
      <NavBar />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />

      <ToastContainer/>

      {/* MAIN CONTENT */}
      <div className="w-[50%] mx-auto p-4 ">
        <div className="w-full mt-20 flex justify-center items-center mx-auto">
          <ProgressBar currentStep={step} steps={2} />
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Chọn sự kiện</h1>

            <div className="mb-10">
              {/* Nếu chưa có sự kiện được chọn, hiển thị Search */}
              {!selectedEvent ? (
                <div>
                  <p className="mb-2 text-gray-600">
                    Bạn muốn bán vé cho sự kiện nào?
                  </p>
                  <Search
                    placeholder="Tìm kiếm sự kiện..."
                    results={events}
                    onSelect={(event) => {
                      if (!selectedEvent) {
                        handleEventSelect();
                        setSelectedEvent(event); // Chọn sự kiện mới
                      }
                    }}
                    renderResult={renderEvent}
                    filterFunction={eventFilter}
                  />
                </div>
              ) : (
                // Nếu đã chọn sự kiện, chỉ hiển thị sự kiện đó
                <div className="border-2 border-green-500 p-4 rounded-lg bg-green-100">
                  {renderEvent(selectedEvent)}
                </div>
              )}
            </div>
            <div className="flex justify-between">
              <button
                className={`py-2 px-4 text-white ${
                  selectedEvent
                    ? "bg-[#87CBB9] hover:bg-[#B9EDDD] hover:text-black"
                    : "bg-gray-300"
                }`}
                disabled={!selectedEvent}
                onClick={goNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-semibold mb-1">Thông tin vé</h2>
            <p className="mb-4 text-gray-600">
              Hãy nhớ rằng bạn chỉ có thể bán vé cho một loại tại một thời điểm.
              Nếu bạn có nhiều loại vé, bạn sẽ cần tạo danh sách riêng cho từng
              loại.
            </p>
            <input
              type="text"
              placeholder="Tên vé"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                handleTicketInfoChange("ticketName", e.target.value)
              }
              value={ticketInfo.ticketName}
              required
            />
            <select
              className="border p-2 w-full mb-4"
              onChange={(e) => {
                handleTicketInfoChange("type", e.target.value);
                setShowRow(e.target.value === "Seat");
              }}
              value={ticketInfo.type}
              required
            >
              <option value="" disabled>
                Chọn loại vé
              </option>
              <option value="Stand">Đứng</option>
              <option value="Seat">Ngồi</option>
            </select>

            <select
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                handleTicketInfoChange("section", e.target.value)
              }
              value={ticketInfo.section}
              required
            >
              <option value="" disabled>
                Chọn khu vực
              </option>
              <option value="A">Khu vực A</option>
              <option value="B">Khu vực B</option>
              <option value="C">Khu vực C</option>
              <option value="D">Khu vực D</option>
            </select>

            {ticketInfo.type === "Seat" ? (
              <input
                type="number"
                placeholder="Hàng"
                className="border p-2 w-full mb-4"
                onChange={(e) =>
                  handleTicketInfoChange("row", Number(e.target.value))
                }
                value={ticketInfo.row ?? ""}
                required={showRow}
              />
            ) : null}

            <input
              type="text"
              placeholder="Số lượng vé"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                handleTicketInfoChange("quantity", Number(e.target.value))
              }
              value={ticketInfo.quantity === 0 ? "" : ticketInfo.quantity}
              required
            />

            <input
              type="text"
              placeholder="Giá gốc"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                handleTicketInfoChange("originPrice", Number(e.target.value))
              }
              value={
                ticketInfo.originPrice
                  ? formatCurrency(ticketInfo.originPrice)
                  : ""
              }
              required
            />

            <input
              type="text"
              placeholder="Giá bán"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                handleTicketInfoChange("price", Number(e.target.value))
              }
              value={ticketInfo.price ? formatCurrency(ticketInfo.price) : ""}
              required
            />

            <label className="block mb-1">Hình vé:</label>
            <input
              type="file"
              multiple
              accept=".png, .jpg, .jpeg"
              className="border p-2 w-full mb-4"
              onChange={handleImageUpload}
              required
            />

            <textarea
              placeholder="Mô tả"
              className="border p-2 w-full mb-4 focus:border-black"
              onChange={(e) =>
                handleTicketInfoChange("description", e.target.value)
              }
            ></textarea>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white py-2 px-4"
                onClick={goBack}
              >
                Back
              </button>

              <button
                className="bg-[#87CBB9] hover:bg-[#B9EDDD] hover:text-black py-2 px-4 text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      {/* FOOTER */}
      <div className="flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default SellScreen;
