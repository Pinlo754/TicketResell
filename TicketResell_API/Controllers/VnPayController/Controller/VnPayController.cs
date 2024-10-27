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

        //[HttpPost("create-payment")]
        //public IActionResult CreatePaymentUrl([FromBody] Order model)
        //{
        //    string? ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        //    string? vnp_TmnCode = _configuration["VNPAY:vnp_TmnCode"];
        //    string? vnp_HashSecret = _configuration["VNPAY:vnp_HashSecret"];
        //    string? vnp_Url = _configuration["VNPAY:vnp_Url"];
        //    string? vnp_ReturnUrl = _configuration["VNPAY:vnp_ReturnUrl"];

        //    var vnp_Params = new SortedList<string, string>();
        //    vnp_Params.Add("vnp_Version", "2.1.0");
        //    vnp_Params.Add("vnp_Command", "pay");
        //    vnp_Params.Add("vnp_TmnCode", vnp_TmnCode);
        //    vnp_Params.Add("vnp_Amount", ((int)(model.totalAmount * 100)).ToString());
        //    vnp_Params.Add("vnp_CreateDate", model.orderDate?.ToString("yyyyMMddHHmmss") ?? DateTime.Now.ToString("yyyyMMddHHmmss"));
        //    vnp_Params.Add("vnp_CurrCode", "VND");
        //    vnp_Params.Add("vnp_IpAddr", ipAddress);
        //    vnp_Params.Add("vnp_Locale", "vn");
        //    vnp_Params.Add("vnp_OrderInfo", $"Thanh toan don hang: {model.orderId}");
        //    vnp_Params.Add("vnp_OrderType", "billpayment");
        //    vnp_Params.Add("vnp_ReturnUrl", vnp_ReturnUrl);
        //    vnp_Params.Add("vnp_TxnRef", model.orderId.ToString());

        //    StringBuilder data = new StringBuilder();
        //    foreach (var kv in vnp_Params)
        //    {
        //        data.Append($"{WebUtility.UrlEncode(kv.Key)}={WebUtility.UrlEncode(kv.Value)}&");
        //    }
        //    string queryString = data.ToString().TrimEnd('&');
        //    string secureHash = _vpnPayService.HmacSHA512(vnp_HashSecret, queryString);
        //    string paymentUrl = $"{vnp_Url}?{queryString}&vnp_SecureHash={secureHash}";

        //    return Ok(new { paymentUrl });
        //}

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

            // take infor from appsettings.json
            string vnp_HashSecret = _configuration["VNPay:vnp_HashSecret"];

            // Generate data string to check signature
            string rawData = string.Join("&", vnpayData
                .Where(x => x.Key != "vnp_SecureHash")
                .OrderBy(x => x.Key)
                .Select(x => $"{WebUtility.UrlEncode(x.Key)}={WebUtility.UrlEncode(x.Value)}"));

            //string secureHash = vnpayData["vnp_SecureHash"];
            if (!vnpayData.TryGetValue("vnp_SecureHash", out string secureHash) || string.IsNullOrEmpty(secureHash))
            {
                return BadRequest("vnp_SecureHash is not present in the query data or is empty.");
            }
            string calculatedHash = _vpnPayService.HmacSHA512(vnp_HashSecret, rawData);

            if (calculatedHash.Equals(secureHash, StringComparison.OrdinalIgnoreCase))
            {
                if (vnpayData.TryGetValue("vnp_TxnRef", out string txnRef))
                {
                    //var order = _context.Orders.FirstOrDefault(c => c.orderId == txnRef);
                    //if (order == null)
                    //{
                    //    return NotFound("No order found.");
                    //}

                    //// Update order status based on vnp_ResponseCode
                    //order.Status = vnpayData["vnp_ResponseCode"] == "00" ? "paid" : "failed";

                    //_context.Orders.Update(order);
                    //_context.SaveChanges();

                    //return Ok("Transaction completed");
                    var order = _context.Orders.FirstOrDefault(c => c.orderId == txnRef);
                    if (order == null)
                    {
                        return NotFound("No order found.");
                    }

                    // Kiểm tra mã vnp_ResponseCode và cập nhật trạng thái đơn hàng chính xác
                    string responseCode = vnpayData["vnp_ResponseCode"];
                    if (responseCode == "00")
                    {
                        order.Status = "paid";
                        _context.Orders.Update(order);
                        _context.SaveChanges();
                        return Ok("Transaction completed successfully");
                    }
                    else if (responseCode == "24")
                    {
                        order.Status = "canceled"; // Thêm trạng thái "canceled" cho đơn hàng bị hủy
                        _context.Orders.Update(order);
                        _context.SaveChanges();
                        return BadRequest("Transaction was canceled");
                    }
                    else
                    {
                        order.Status = "failed";
                        _context.Orders.Update(order);
                        _context.SaveChanges();
                        return BadRequest("Transaction failed with response code: " + responseCode);
                    }
                }
                else
                {
                    return NotFound("No order found.");
                }
            }           
            else
            {
                return BadRequest("Invalid signature");
            }
        }
    }
}
