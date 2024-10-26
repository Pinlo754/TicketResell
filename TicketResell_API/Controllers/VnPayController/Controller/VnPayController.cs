using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Org.BouncyCastle.Utilities.Net;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.VnPayController.Model;


namespace TicketResell_API.Controllers.VnPayController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly VnPayService _vpnPayService;
        private readonly AppDbContext _context;

        public VnPayController(IConfiguration configuration, VnPayService vnPayService, AppDbContext context)
        {
            _configuration = configuration;
            _vpnPayService = vnPayService;
            _context = context;
        }

        [HttpPost("create-payment")]
        public IActionResult CreatePaymentUrl([FromBody] Order model)
        {
            string? ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
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
            string secureHash = _vpnPayService.HmacSHA512(vnp_HashSecret, queryString);
            string paymentUrl = $"{vnp_Url}?{queryString}&vnp_SecureHash={secureHash}";

            return Ok(new { paymentUrl });
        }

        //Handle callback from VNPAY after payment.
        [HttpGet("return")]
        public IActionResult VNPayReturn()
        {
            var queryParameters = HttpContext.Request.Query;
            var vnpayData = new SortedList<string, string>();

            foreach (var key in queryParameters.Keys)
            {
                if (key.StartsWith("vnp_"))
                {
                    vnpayData.Add(key, queryParameters[key]);
                }
            }

            // Lấy thông tin từ appsettings.json
            string vnp_HashSecret = _configuration["VNPay:vnp_HashSecret"];

            // Tạo chuỗi dữ liệu để kiểm tra chữ ký
            string rawData = string.Join("&", vnpayData
                .Where(x => x.Key != "vnp_SecureHash")
                .OrderBy(x => x.Key)
                .Select(x => $"{WebUtility.UrlEncode(x.Key)}={WebUtility.UrlEncode(x.Value)}"));

            //string secureHash = vnpayData["vnp_SecureHash"];
            if (!vnpayData.TryGetValue("vnp_SecureHash", out string secureHash) || string.IsNullOrEmpty(secureHash))
            {
                return BadRequest("vnp_SecureHash không có trong dữ liệu truy vấn hoặc rỗng.");
            }
            string calculatedHash = _vpnPayService.HmacSHA512(vnp_HashSecret, rawData);

            if (calculatedHash.Equals(secureHash, StringComparison.OrdinalIgnoreCase))
            {
                 if (vnpayData.TryGetValue("vnp_TxnRef", out string txnRef) && int.TryParse(txnRef, out int orderId))
                {
                    var order = _context.Orders.FirstOrDefault(c => c.orderId == orderId);
                    if (order != null)
                    {
                        order.Status = vnpayData["vnp_ResponseCode"] == "00" ? "paid" : "failed";
                        _context.Orders.Update(order);
                        _context.SaveChanges();

                        return Ok("Giao dịch hoàn tất");
                    }
                    else
                    {
                        return NotFound("Không tìm thấy đơn hàng.");
                    }
                }
                else
                {
                    return NotFound("Không tìm thấy đơn hàng.");
                }
            }
            else
            {
                return BadRequest("Chữ ký không hợp lệ");
            }
        }
    }
}
