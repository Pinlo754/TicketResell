using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace TicketResell_API.Controllers.VnPayController.Model
{
    public class VnPayService
    {
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
    }
}
