import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";



const useListEvent = () => {
    const navigate: NavigateFunction = useNavigate();
    const [events, setEvents] = useState<Event[]>([]); // State quản lý tất cả sản phẩm
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); // Sản phẩm sau khi lọc

    // EVENTS

    type Event = {
      eventId: number;
      eventName: string;
      eventImage: string;
      eventTime: string;
      location: string;
      city: string;
      eventStatus: string;
    };

      useEffect(() => {
        fetchEvents();
      }, []);

      const fetchEvents = () => {
        axios.get('/api/Event/list-event')
          .then(response => {
            const events: Event[] = response.data;
            const activeEvents = events.filter(event => event.eventStatus === 'Ongoing');
            setEvents(activeEvents);
            setFilteredEvents(activeEvents);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };
    
    // DROPDOWN SORT

   // Khai báo state `isOpen` để theo dõi trạng thái của dropdown (mở hoặc đóng)
    const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

    // Khai báo state `selectedOption` để lưu tùy chọn hiện tại mà người dùng đã chọn (mặc định là 'latest')
    const [selectedOption, setSelectedOption] = useState<string>("latest");

    // Hàm `toggleDropdown` dùng để mở hoặc đóng dropdown menu khi người dùng click vào nút
    // Toggle dropdown dựa vào id
   const toggleDropdown = (id: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Đảo ngược trạng thái của dropdown có id tương ứng
    }));
   };

    // Hàm `handleSelect` được gọi khi người dùng chọn một tùy chọn từ dropdown
    const handleSelect = (option: string) => {
    setSelectedOption(option); // Cập nhật giá trị tùy chọn mà người dùng đã chọn
    setIsOpen({}); // Đóng menu sau khi chọn
    };

    // Sử dụng hook `useRef` để tạo ra một tham chiếu đến phần tử DOM của container dropdown
    // `dropdownRef` giúp chúng ta xác định vị trí phần tử trong DOM để xử lý click ra ngoài
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Hàm `handleClickOutside` để kiểm tra xem người dùng có click ra ngoài container của dropdown hay không
    const handleClickOutside = (event: MouseEvent) => {
    // Kiểm tra nếu `dropdownRef.current` tồn tại và nếu phần tử bị click (event.target) không nằm bên trong container
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen({}); // Nếu click ra ngoài, đóng dropdown
    }
    };

    // Sử dụng hook `useEffect` để gắn và gỡ sự kiện click toàn trang
    useEffect(() => {
    // Gắn sự kiện `mousedown` vào tài liệu (toàn trang) để theo dõi sự kiện click
    // Mỗi khi người dùng click chuột, hàm `handleClickOutside` sẽ được gọi
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function: khi component bị hủy (unmount), sự kiện sẽ được gỡ bỏ
    // Điều này giúp tránh rò rỉ bộ nhớ khi component không còn tồn tại
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []); // Chỉ chạy một lần khi component được render lần đầu tiên (do mảng dependency rỗng)

    // Số sự kiện trên mỗi trang
    const eventsPerPage = 2;

    // State quản lý trang hiện tại
    const [currentPage, setCurrentPage] = useState(1);

    // Tổng số trang
    const totalPages = Math.ceil(events.length / eventsPerPage);

    // Lấy danh sách sự kiện theo trang
    const currentEvents = events.slice(
        (currentPage - 1) * eventsPerPage,
        currentPage * eventsPerPage
    );

    // Chuyển trang
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return {
        navigate,
        events, 
        setEvents,
        filteredEvents,
        setFilteredEvents,
        isOpen,
        setIsOpen,
        toggleDropdown,
        selectedOption,
        setSelectedOption,
        handleSelect,
        dropdownRef,
        handleClickOutside,
        eventsPerPage,
        currentPage,
        setCurrentPage,
        totalPages,
        currentEvents,
        goToPage,
    };
}

export default useListEvent;