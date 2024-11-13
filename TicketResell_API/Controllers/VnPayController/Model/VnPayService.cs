using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using TicketResell_API.Controllers.User.Model;

namespace TicketResell_API.Controllers.VnPayController.Model
{
    public class VnPayService
    {
        private readonly IConfiguration _configuration;

        public VnPayService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string CreatePaymentUrl( Order model, string ipAddress)
        {
            string? vnp_TmnCode = _configuration["VNPAY:vnp_TmnCode"];
            string? vnp_HashSecret = _configuration["VNPAY:vnp_HashSecret"];
            string? vnp_Url = _configuration["VNPAY:vnp_Url"];
            string? vnp_ReturnUrl = _configuration["VNPAY:vnp_ReturnUrl"];

            var vnp_Params = new SortedList<string, string>();
            vnp_Params.Add("vnp_Version", "2.1.0");
            vnp_Params.Add("vnp_Command", "pay");
            vnp_Params.Add("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.Add("vnp_Amount", ((int)(model.totalAmount * 100)).ToString());
            vnp_Params.Add("vnp_CreateDate", model.orderDate?.ToString("yyyyMMddHHmmss") ?? DateTime.Now.ToString("yyyyMMddHHmmss"));
            vnp_Params.Add("vnp_CurrCode", "VND");
            vnp_Params.Add("vnp_IpAddr", ipAddress);
            vnp_Params.Add("vnp_Locale", "vn");
            vnp_Params.Add("vnp_OrderInfo", $"Thanh toan don hang: {model.orderId}");
            vnp_Params.Add("vnp_OrderType", "billpayment");
            vnp_Params.Add("vnp_ReturnUrl", vnp_ReturnUrl);
            vnp_Params.Add("vnp_TxnRef", model.orderId.ToString());

            StringBuilder data = new StringBuilder();
            foreach (var kv in vnp_Params)
            {
                data.Append($"{WebUtility.UrlEncode(kv.Key)}={WebUtility.UrlEncode(kv.Value)}&");
            }
            string queryString = data.ToString().TrimEnd('&');
            string secureHash = HmacSHA512(vnp_HashSecret, queryString);
            string paymentUrl = $"{vnp_Url}?{queryString}&vnp_SecureHash={secureHash}";

            return paymentUrl;
        }
        public bool ValidateSignature(SortedList<string, string> vnpayData, string inputHash, string secretKey)
        {
            // Xóa các tham số chữ ký khỏi dữ liệu cần xác thực
            vnpayData.Remove("vnp_SecureHashType");
            vnpayData.Remove("vnp_SecureHash");

            StringBuilder data = new StringBuilder();
            foreach (var kv in vnpayData)
            {
                if (!string.IsNullOrEmpty(kv.Value))
                {
                    data.Append($"{WebUtility.UrlEncode(kv.Key)}={WebUtility.UrlEncode(kv.Value)}&");
                }
            }
            string dataToHash = data.ToString().TrimEnd('&');
            string myChecksum = HmacSHA512(secretKey, dataToHash);

            return myChecksum.Equals(inputHash, StringComparison.InvariantCultureIgnoreCase);
        }

        public string HmacSHA512(string key, string inputData)
        {
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentNullException(nameof(key), "Key không được null hoặc trống");
            }
            if (string.IsNullOrEmpty(inputData))
            {
                throw new ArgumentNullException(nameof(inputData), "InputData không được null hoặc trống");
            }

            using (var hmac = new HMACSHA512(Encoding.UTF8.GetBytes(key)))
            {
                byte[] hashBytes = hmac.ComputeHash(Encoding.UTF8.GetBytes(inputData));
                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }
        }

        public async Task<PaymentResult> ProcessPaymentAsync(Order order, string ipAddress)
        {
            // Giả lập gọi tới dịch vụ thanh toán bên ngoài
            try
            {
                // Giả lập thời gian xử lý của dịch vụ thanh toán
                await Task.Delay(1000);

                // Giả lập kết quả thanh toán thành công
                bool paymentSuccess = true; // Thay thế bằng việc kiểm tra kết quả thanh toán từ API nhà cung cấp

                if (paymentSuccess)
                {
                    return new PaymentResult { IsSuccess = true };
                }
                else
                {
                    return new PaymentResult { IsSuccess = false, ErrorMessage = "Payment failed due to insufficient funds" };
                }
            }
            catch (Exception ex)
            {
                return new PaymentResult { IsSuccess = false, ErrorMessage = ex.Message };
            }
        }
    }
}
