using System.Security.Cryptography;
using System.Text;
using TicketResell_API.Controllers.User.Service;

namespace TicketResell_API.Controllers.User.Model
{
    public class MomoPaymentService : IMomoPaymentService
    {
        public async Task<string> GenerateSignatureAsync(string partnerCode, string accessKey, string requestId, string orderId, string orderInfo, string returnUrl, string notifyUrl, string amount, string extraData, string secretKey)
        {
            // Tạo chuỗi rawData từ các tham số cần thiết cho yêu cầu thanh toán.
            string rawData = $"partnerCode={partnerCode}&" +
                             $"accessKey={accessKey}&" +
                             $"requestId={requestId}&" +
                             $"orderId={orderId}&" +
                             $"orderInfo={orderInfo}&" +
                             $"returnUrl={returnUrl}&" +
                             $"notifyUrl={notifyUrl}&" +
                             $"amount={amount}&" +
                             $"extraData={extraData}";

            // Tạo đối tượng HMACSHA256 sử dụng secretKey làm khóa bí mật.
            using (var hmacsha256 = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey)))
            {
                // Tính toán giá trị băm (hash) cho chuỗi rawData.
                byte[] rawDataBytes = Encoding.UTF8.GetBytes(rawData);
                byte[] hashMessage = hmacsha256.ComputeHash(rawDataBytes);

                // Chuyển đổi mảng byte (hashMessage) thành chuỗi hex.
                string signature = BitConverter.ToString(hashMessage)
                                              .Replace("-", "")
                                              .ToLower();

                // Trả về chữ ký đã được tạo.
                return signature;
            }
        }
    }
}
