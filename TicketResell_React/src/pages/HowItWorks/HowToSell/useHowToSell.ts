import { useNavigate } from "react-router-dom";

const useHowToSell = () => {

    type Step = {
        color: string,
        title: string,
        description: string,
    };

    const steps: Step[] = [
        {
            color: "bg-blue-500",
            title: "Đăng ký tài khoản",
            description: "Người dùng cần tạo tài khoản hoặc đăng nhập vào hệ thống bằng email để bắt đầu quá trình đăng ký bán vé. Tài khoản của bạn sẽ giúp theo dõi và quản lý vé đã đăng.",
        },
        {
            color: "bg-green-500",
            title: "Chọn sự kiện",
            description: "Tìm kiếm sự kiện mà bạn có vé muốn bán. Xem qua danh sách các sự kiện sẵn có trên nền tảng, chọn đúng sự kiện và đảm bảo thông tin về sự kiện là chính xác.",
        },
        {
            color: "bg-yellow-500",
            title: "Điền thông tin vé",
            description: "Nhập thông tin chi tiết của vé như loại vé, vị trí, số lượng, giá bán. Hãy đảm bảo rằng tất cả thông tin đều chính xác để người mua dễ dàng hiểu và quyết định.",
        },
        {
            color: "bg-purple-500",
            title: "Xác nhận",
            description: "Nhóm của chúng tôi kiểm tra thủ công từng danh sách trước khi cung cấp vé cho người dùng để đảm bảo giá cả và thông tin chi tiết về vé đều chính xác. Bạn sẽ được thông báo ngay khi chúng được đăng bán, thông thường việc này sẽ chỉ mất vài phút.",
        },
        {
            color: "bg-red-500",
            title: "Quản lý giao dịch",
            description: "Sau khi vé được đăng bán, bạn có thể theo dõi tình trạng giao dịch, quản lý các yêu cầu mua từ người dùng, và theo dõi doanh thu của bạn qua hệ thống quản lý giao dịch trong tài khoản.",
        },
    ];
    
    const navigate = useNavigate();
    return {
        steps,
        navigate,
    };
};

export default useHowToSell;