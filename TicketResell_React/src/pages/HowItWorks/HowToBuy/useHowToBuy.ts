import { useNavigate } from "react-router-dom";

const useHowToBuy = () => {

    type Step = {
        color: string,
        title: string,
        description: string,
    };

    const steps: Step[] = [
        {
          color: "bg-blue-500",
          title: "Tìm Sự Kiện",
          description:
            "Truy cập trang chủ của chúng tôi và duyệt qua danh sách sự kiện nổi bật. Ngoài ra, bạn có thể tìm kiếm bằng tên sự kiện để tìm được sự kiện phù hợp nhất với sở thích của mình.",
        },
        {
          color: "bg-green-500",
          title: "Kiểm Tra Vé",
          description:
            "Chọn sự kiện bạn muốn tham gia để xem các tùy chọn vé có sẵn. Chúng tôi cung cấp thông tin chi tiết về từng loại vé, bao gồm vị trí, số lượng và giá cả, giúp bạn đưa ra quyết định dễ dàng.",
        },
        {
          color: "bg-yellow-500",
          title: "Đặt Mua Vé",
          description:
            'Sau khi chọn loại vé phù hợp, nhấn vào nút "Thêm vào giỏ hàng" để lưu vé vào giỏ. Tại đây, bạn có thể kiểm tra lại số lượng vé mong muốn và xem tổng chi phí trước khi tiến hành thanh toán. Nếu muốn mua ngay, hãy nhấn vào nút "Mua" để chuyển thẳng đến bước thanh toán.',
        },
        {
          color: "bg-purple-500",
          title: "Thanh Toán",
          description:
            "Vui lòng cung cấp đầy đủ thông tin thanh toán và phương thức liên lạc của bạn một cách chính xác. Chúng tôi hỗ trợ thanh toán bằng phương thức điện tử, mang lại sự tiện lợi và an toàn cho bạn trong quá trình mua vé.",
        },
        {
          color: "bg-red-500",
          title: "Nhận Vé",
          description:
            "Sau khi thanh toán thành công, bạn sẽ nhận được vé điện tử qua email đã đăng ký. Bạn có thể in vé hoặc lưu trên thiết bị di động để xuất trình tại cổng vào sự kiện.",
        },
      ];

      const navigate = useNavigate();

    return {
        steps,
        navigate,
    };
};

export default useHowToBuy;