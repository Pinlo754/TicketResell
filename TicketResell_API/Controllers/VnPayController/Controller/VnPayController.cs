using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Org.BouncyCastle.Utilities.Net;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using TicketResell_API.Controllers.OrderController.Model;
using TicketResell_API.Controllers.Service;
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
        private readonly IEmailSender _emailSender;

        public VnPayController(IConfiguration configuration, VnPayService vnPayService, AppDbContext context, IEmailSender emailSender)
        {
            _configuration = configuration;
            _vpnPayService = vnPayService;
            _context = context;
            _emailSender = emailSender;
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

                    var orderDetails = _context.OrderDetails
                                        .Include(od => od.Tickets)    // Bao gồm Ticket cho mỗi OrderDetail
                                        .Where(od => od.orderId == txnRef)
                                        .ToList();

                    if (orderDetails == null)
                    {
                        return NotFound("No order found.");
                    }
                    var orderDetail = orderDetails.First(); // Giả sử chỉ có 1 OrderDetail cho mỗi Order

                    // Lấy các thông tin từ OrderDetail
                    string email = orderDetail.receiverEmail;
                    string orderId = txnRef;
                    string eventName = orderDetail.eventName;
                    string ticketDetails = $"{orderDetail.ticketName} x {orderDetail.quantity}";
                    string[] imagesQR = orderDetails.SelectMany(od => od.Tickets.imagesQR).ToArray(); // Nếu có QR code cho từng vé

                    // Kiểm tra mã vnp_ResponseCode và cập nhật trạng thái đơn hàng chính xác
                    string responseCode = vnpayData["vnp_ResponseCode"];
                    if (responseCode == "00")
                    {
                        orderDetail.status = "paid";
                        _context.OrderDetails.Update(orderDetail);
                        _context.SaveChanges();

                        // Gửi email xác nhận
                         _emailSender.SendOrderConfirmationEmailAsync(email, orderId, eventName, ticketDetails, imagesQR);

                        return Ok("Transaction completed successfully");
                    }
                    else if (responseCode == "24")
                    {
                        orderDetail.status = "canceled";
                        _context.OrderDetails.Update(orderDetail);
                        _context.SaveChanges();
                        return BadRequest("Transaction was canceled");
                    }
                    else
                    {
                        orderDetail.status = "failed";
                        _context.OrderDetails.Update(orderDetail);
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
