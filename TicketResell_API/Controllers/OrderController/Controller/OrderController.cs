using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.OrderController.Model;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.VnPayController.Model;

namespace TicketResell_API.Controllers.OrderController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly AppDbContext _context;
        private readonly VnPayService _vpnPayService;

        public OrderController(AppDbContext context, VnPayService vnPayService)
        {
            _context = context;
            _vpnPayService = vnPayService;
        }

        [HttpGet("get/{orderId}")]
        public async Task<ActionResult<Order>> GetOrderById(string orderId)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.orderId! == orderId);

            if (order == null)
            {
                return NotFound($"Order with ID {orderId} not found.");
            }

            return Ok(order);
        }

        [HttpGet("get-user-orders/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetUserOrders(string userId)
        {
            // Lấy tất cả đơn hàng của người dùng bằng userId
            var orders = await _context.Orders
                                        .Where(o => o.userId == userId)
                                        .Select(o => o.orderId)
                                        .ToListAsync();

            // Nếu không tìm thấy đơn hàng nào thì trả về NotFound
            if (orders == null || !orders.Any())
            {
                return NotFound($"No orders found for user {userId}.");
            }

            // Lấy tất cả các OrderDetail liên quan đến danh sách OrderId
            var orderDetails = await _context.OrderDetails
                                             .Where(od => orders.Contains(od.orderId))
                                             .ToListAsync();

            // Trả về danh sách OrderDetail
            return Ok(orderDetails);
        }

        [HttpPut("update/{orderId}")]
        public async Task<ActionResult<Order>> UpdateOrder(string orderId, [FromBody] Order updatedOrder)
        {
            if (updatedOrder == null)
            {
                return BadRequest("Order data is null.");
            }

            var existingOrder = await _context.Orders.FirstOrDefaultAsync(o => o.orderId == orderId);
            if (existingOrder == null)
            {
                return NotFound($"Order with ID {orderId} not found.");
            }

            // Cập nhật thông tin đơn hàng
            existingOrder.Status = updatedOrder.Status;
            existingOrder.totalAmount = updatedOrder.totalAmount;

            await _context.SaveChangesAsync();

            return Ok(existingOrder);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateOrder([FromBody] OrderWithDetails model)
        {
            // Kiểm tra dữ liệu đầu vào
            if (model == null || string.IsNullOrEmpty(model.userId) || model.OrderDetails == null || !model.OrderDetails.Any())
            {
                return BadRequest("Order data is null, User ID is missing, or no order details provided.");
            }

            // Tạo ID cho đơn hàng
            var order = new Order
            {
                orderId = Guid.NewGuid().ToString(),
                userId = model.userId,
                orderDate = DateTime.UtcNow,
                totalAmount = model.totalAmount,
                Status = "Pending"
            };

            // Lưu đơn hàng vào cơ sở dữ liệu
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Tạo các chi tiết đơn hàng (OrderDetail) và liên kết với OrderId
            foreach (var detail in model.OrderDetails)
            {
                var orderDetail = new OrderDetail
                {
                    orderId = order.orderId,
                    ticketId = detail.ticketId,
                    ticketName = detail.ticketName,
                    ticketType = detail.ticketType,
                    eventImage = detail.eventImage,
                    eventName = detail.eventName,
                    userName = detail.userName,
                    receiverPhone = detail.receiverPhone,
                    receiverEmail = detail.receiverEmail,
                    address = detail.address,
                    price = detail.price,
                    quantity = detail.quantity,
                    paymentMethod = detail.paymentMethod,
                    status = "Pending",
                    createdAt = DateTime.UtcNow
                };
                _context.OrderDetails.Add(orderDetail);
            }

            // Lưu các chi tiết đơn hàng vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            // Lấy địa chỉ IP của người dùng để gửi cho VNPay
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

            // Gọi phương thức CreatePaymentUrl để tạo URL thanh toán
            var paymentUrl = _vpnPayService.CreatePaymentUrl(order, ipAddress);

            // Trả về thông tin đơn hàng và URL thanh toán
            return CreatedAtAction(nameof(GetOrderById), new { orderId = order.orderId }, new
            {
                Order = order,
                PaymentUrl = paymentUrl
            });
        }
    }
}
