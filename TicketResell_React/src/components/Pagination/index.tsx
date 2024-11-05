import React, { useState } from 'react';

// Component Pagination với các props như currentPage, totalPages, và goToPage
type PaginationProps = {
  currentPage: number;      // Trang hiện tại
  totalPages: number;       // Tổng số trang
  goToPage: (page: number) => void;  // Hàm chuyển trang
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, goToPage }) => {
  const [inputPage, setInputPage] = useState(''); // State lưu giá trị nhập vào của ô input
  const [showPopup, setShowPopup] = useState(false); // State kiểm soát popup

  // Hàm cuộn trang lên đầu
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hàm tạo danh sách trang rút gọn
  const renderPagination = () => {
    let pages = [];

    if (totalPages <= 6) {
      // Nếu tổng số trang <= 6, hiển thị tất cả các trang
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => {
              goToPage(i);
              scrollToTop();
            }}
            className={`px-2.5 h-full hover:bg-[#87CBB9] hover:text-white ${
              currentPage === i ? "bg-[#87CBB9] text-white font-bold" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Hiển thị trang 1 luôn luôn
      pages.push(
        <button
          key={1}
          onClick={() => {
            goToPage(1);
            scrollToTop();
          }}
          className={`px-2.5 h-full hover:bg-[#87CBB9] hover:text-white ${
            currentPage === 1 ? "bg-[#87CBB9] text-white font-bold" : ""
          }`}
        >
          1
        </button>
      );

      // Nếu trang hiện tại lớn hơn 4, thêm dấu 3 chấm sau trang 1
      if (currentPage > 4) {
        pages.push(<span key="dots1" className="pagination-btn">...</span>);
      }

      // Hiển thị 5 trang xung quanh trang hiện tại
      const startPage = Math.max(2, currentPage - 2);  // Bắt đầu từ trang 2 hoặc trước trang hiện tại 2 trang
      const endPage = Math.min(totalPages, currentPage + 3);  // Kết thúc tại trang hiện tại + 2 hoặc trang cuối 
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => {
              goToPage(i);
              scrollToTop();
            }}
            className={`px-2.5 h-full hover:bg-[#87CBB9] hover:text-white ${
              currentPage === i ? "bg-[#87CBB9] text-white font-bold" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    }
    
    return pages;
  };

  // Hàm xử lý khi nhấn Enter trong ô input để chuyển đến trang
  const handleInputPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      goToPage(pageNumber);
      scrollToTop(); // Cuộn trang lên đầu sau khi nhập số trang
      setShowPopup(false); // Đóng popup
    }
    setInputPage(''); // Reset giá trị ô input sau khi xử lý
  };

  return (
    <div className="w-fit flex items-center justify-center mt-10 border-2">
      {/* Trang trước */}
      <button
        onClick={() => {
          goToPage(currentPage - 1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
        className={`px-2 h-full ${currentPage === 1 ? "opacity-50" : "hover:bg-[#87CBB9] hover:text-white"}`}
      >
        &lt;
      </button>

      {/* Hiển thị số trang với 3 chấm */}
      {renderPagination()}

      {/* Trang sau */}
      <button
        onClick={() => {
          goToPage(currentPage + 1);
          scrollToTop();
        }}
        disabled={currentPage === totalPages}
        className={`px-2 h-full ${currentPage === totalPages ? "opacity-50" : "hover:bg-[#87CBB9] hover:text-white"}`}
      >
        &gt;
      </button>

      {/* Điều hướng về trang cuối */}
      <button
        onClick={() => {
          goToPage(totalPages);
          scrollToTop();
        }}
        disabled={currentPage === totalPages}
        className={`px-2.5 h-full ${currentPage === totalPages ? "opacity-50" : "hover:bg-[#87CBB9] hover:text-white"}`}
      >
        &raquo;
      </button>

      {/* Nút chọn trang có popup */}
      <div className="relative">
        <button
          onClick={() => setShowPopup(!showPopup)}
          className={`px-1.5 py-1 flex items-center hover:bg-[#87CBB9] hover:text-white ${showPopup ? "bg-[#87CBB9] text-white outline-none ring" : ""} `}
        >
          Chọn trang
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Popup nhập số trang */}
        {showPopup && (
          <div className="absolute right-0 mt-2 w-28 p-1 bg-white border border-gray-300 rounded shadow-lg z-10">
            <form onSubmit={handleInputPage}>
              <input
                type="number"
                id="goToPage"
                className="mt-1 block w-full p-1 border border-gray-300 rounded"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                min={1}
                max={totalPages}
                placeholder="Số trang..."
              />
              <button
                type="submit"
                className="mt-2 w-full px-3 py-1 bg-[#87CBB9] text-white rounded hover:bg-[#B9EDDD] hover:text-black"
              >
                Đi
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;