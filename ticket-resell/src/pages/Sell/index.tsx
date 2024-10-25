import React, { useState } from 'react';
import ProgressBar from '../../components/ProgressBar';
import useSell, { Event } from './useSell';
import Search from '../../components/Search';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";

const Sell: React.FC = () => {
  const {
    mockEvents,
    navigate,
    step,
    setStep,
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
    <div className="relative">
      {/* Sự kiện được chọn hiển thị dấu X */}
      {selectedEvent && selectedEvent.name === event.name && (
        <button
          className="absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation(); // Để ngăn việc trigger chọn lại sự kiện
            setSelectedEvent(null); // Hủy chọn sự kiện
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <h3 className="font-semibold">{event.name}</h3>
      <p>{event.date} - {event.time}</p>
      <p>{event.location}</p>
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
                    results={mockEvents}
                    onSelect={(event) => {
                      if (!selectedEvent) {
                        handleEventSelect(event);
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
            <select
              className="border p-2 w-full mb-4"
              onChange={(e) => {
                handleTicketInfoChange("type", e.target.value);
                setShowRow(e.target.value === "Seat");
                if (e.target.value !== "Seat") {
                  handleTicketInfoChange("row", ""); // Đặt lại giá trị row khi loại vé không phải là "Ngồi"
                }
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

            {showRow && (
              <select
                className="border p-2 w-full mb-4"
                onChange={(e) => handleTicketInfoChange("row", e.target.value)}
                value={ticketInfo.row || ""}
                required={showRow}
              >
                <option value="" disabled>
                  Chọn hàng
                </option>
                <option value="1">Hàng 1</option>
                <option value="2">Hàng 2</option>
                <option value="3">Hàng 3</option>
              </select>
            )}

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
              placeholder="Giá vé"
              className="border p-2 w-full mb-4"
              onChange={(e) =>
                handleTicketInfoChange("price", Number(e.target.value))
              }
              value={ticketInfo.price ? formatCurrency(ticketInfo.price) : ""}
              required
            />

            <input
              type="file"
              multiple
              accept=".pdf"
              className="border p-2 w-full mb-4"
              onChange={handleImageUpload}
              required
            />
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

export default Sell;