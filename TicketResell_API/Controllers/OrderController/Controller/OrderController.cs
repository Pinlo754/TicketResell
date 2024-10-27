using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.OrderController.Model;
using TicketResell_API.Controllers.Service;
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
        private readonly IEmailSender _emailSender;

        public OrderController(AppDbContext context, VnPayService vnPayService, IEmailSender emailSender)
        {
            _context = context;
            _vpnPayService = vnPayService;
            _emailSender = emailSender;
        }

        [HttpGet("get/{orderId}")]
        public async Task<ActionResult<Order>> GetOrderById(string orderId)
        {
            //find order by order id
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.orderId! == orderId);
            //check if order id is null
            if (order == null)
            {
                return NotFound($"Order with ID {orderId} not found.");
            }

            return Ok(order);
        }

        [HttpGet("get-user-orders/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetUserOrders(string userId)
        {
            // Get all user orders by userId
            var orders = await _context.Orders
                                        .Where(o => o.userId == userId)
                                        .Select(o => o.orderId)
                                        .ToListAsync();

            // If no order is found, return NotFound
            if (orders == null || !orders.Any())
            {
                return NotFound($"No orders found for user {userId}.");
            }

            // Get all OrderDetails related to OrderId list
            var orderDetails = await _context.OrderDetails
                                             .Where(od => orders.Contains(od.orderId))
                                             .ToListAsync();

            //Returns a list of OrderDetails
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

            // Update order information
            existingOrder.Status = updatedOrder.Status;
            existingOrder.totalAmount = updatedOrder.totalAmount;

            await _context.SaveChangesAsync();

            return Ok(existingOrder);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateOrder([FromBody] OrderWithDetails model)
        {
            //Check input data
            if (model == null || string.IsNullOrEmpty(model.userId) || model.OrderDetails == null || !model.OrderDetails.Any())
            {
                return BadRequest("Order data is null, User ID is missing, or no order details provided.");
            }

            // Create ID for order
            var order = new Order
            {
                orderId = Guid.NewGuid().ToString(),
                userId = model.userId,
                orderDate = DateTime.UtcNow,
                totalAmount = model.totalAmount,
                Status = "Pending"
            };

            // Save orders to database
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Create order details (OrderDetail) and associate with OrderId
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

            // Save order details to database
            await _context.SaveChangesAsync();

            //Get user's IP address to send to VNPay
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();

            //Call the CreatePaymentUrl method to create a payment URL
            var paymentUrl = _vpnPayService.CreatePaymentUrl(order, ipAddress);

            //Send order confirmation email
            string ticketDetails = string.Join(", ", model.OrderDetails.Select(d => $"{d.ticketName} - {d.quantity} tickets"));
            await _emailSender.SendOrderConfirmationEmailAsync(model.OrderDetails.First().receiverEmail, order.orderId, model.OrderDetails.First().eventName, ticketDetails);

            // Return order information and payment URL
            return CreatedAtAction(nameof(GetOrderById), new { orderId = order.orderId }, new
            {
                Order = order,
                PaymentUrl = paymentUrl
            });
        }
    }
}
