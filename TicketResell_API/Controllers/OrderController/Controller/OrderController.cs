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
        public async Task<ActionResult<OrderWithDetails>> GetOrderById(string orderId)
        {
            //find order by order id
            var order = await _context.Orders
                 .Where(o => o.orderId == orderId)
                .Include(o => o.OrderDetails)
                .Select(o => new OrderWithDetails
                {
                    userId = o.userId,
                    totalAmount = o.totalAmount ?? 0,
                    OrderDetails = o.OrderDetails.ToList()
                })
                 .FirstOrDefaultAsync();
            //check if order id is null
            if (order == null)
            {
                //return not found
                return NotFound($"Order with ID {orderId} not found.");
            }
            // return 200
            return Ok(order);
        }

        [HttpGet("get-user-orders/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> GetUserOrders(string userId)
        {
            // Get all user orders by userId
            var orders = await _context.Orders
                                        .Include(o => o.OrderDetails)
                                        .Where(o => o.userId == userId)
                                        .ToListAsync();

            // If no order is found, return NotFound
            if (orders == null || !orders.Any())
            {
                return NotFound($"No orders found for user {userId}.");
            }

            // return all OrderDetails related to OrderId list
            return Ok(orders.SelectMany(o => o.OrderDetails));
        }

        [HttpGet("seller/{sellerId}")]
        public async Task<ActionResult<IEnumerable<OrderWithDetails>>> GetOrdersBySeller(string sellerId)
        {
            // take all order with orderDetail
            var orders = await _context.Orders
                .Where(o => o.sellerId == sellerId)
                .Select(o => new OrderWithDetails
                {
                    userId = o.userId,
                    totalAmount = o.totalAmount ?? 0,
                    status = o.Status ?? "Successful",
                    OrderDetails = o.OrderDetails.Select(d => new OrderDetail
                    {
                        orderDetailId = d.orderDetailId,
                        orderId = d.orderId,
                        ticketId = d.ticketId,
                        ticketName = d.ticketName,
                        ticketType = d.ticketType,
                        eventImage = d.eventImage,
                        eventName = d.eventName,
                        userName = d.userName,
                        receiverPhone = d.receiverPhone,
                        receiverEmail = d.receiverEmail,
                        address = d.address,
                        price = d.price,
                        quantity = d.quantity,
                        status = d.status,
                        paymentMethod = d.paymentMethod,
                        createdAt = d.createdAt
                    }).ToList()
                })
                .ToListAsync();

            if (orders == null || !orders.Any())
            {
                return NotFound("No orders found for this seller.");
            }

            return Ok(orders);
        }

        [HttpPut("update/{orderId}")]
        public async Task<ActionResult<Order>> UpdateOrder(string orderId, [FromBody] Order updatedOrder)
        {
            if (updatedOrder == null)
            {
                return BadRequest("Order data is null.");
            }

            var existingOrder = new Order { orderId = orderId };
            _context.Attach(existingOrder);
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
            using var transaction = await _context.Database.BeginTransactionAsync();
            //take sellerId from userId in ticket
            try
            {
                //take sellerId from ticket
                var sellerId = await _context.Tickets
                    .Where(t => model.OrderDetails.Select(d => d.ticketId).Contains(t.ticketId))
                    .Select(t => t.userId)
                    .FirstOrDefaultAsync();

                if (string.IsNullOrEmpty(sellerId))
                {
                    return BadRequest("No valid seller found for the provided tickets.");
                }


                // Create the Order
                var order = new Order
                {
                    orderId = Guid.NewGuid().ToString(),
                    userId = model.userId,
                    sellerId = sellerId,
                    orderDate = DateTime.UtcNow,
                    totalAmount = model.totalAmount,
                    Status = "Pending"
                };
                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // Create OrderDetails and associate them with the Order
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
                await _context.SaveChangesAsync();

                // Update the quantity of tickets
                foreach (var detail in model.OrderDetails)
                {
                    var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.ticketId == detail.ticketId);
                    if (ticket != null)
                    {
                        ticket.quantity -= detail.quantity;
                    }
                }
                await _context.SaveChangesAsync();

                // Call the CreatePaymentUrl method to create a payment URL
                var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
                var paymentUrl = _vpnPayService.CreatePaymentUrl(order, ipAddress);
                var paymentResult = await _vpnPayService.ProcessPaymentAsync(order, paymentUrl);

                if (!paymentResult.IsSuccess)
                {
                    // Payment failed, rollback the order
                    _context.Orders.Remove(order);

                    // Rollback quantity of tickets
                    foreach (var detail in model.OrderDetails)
                    {
                        var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.ticketId == detail.ticketId);
                        if (ticket != null)
                        {
                            // refund the quatity of ticket
                            ticket.quantity += detail.quantity;
                        }
                    }

                    await _context.SaveChangesAsync();
                    await transaction.RollbackAsync();
                    return BadRequest("Payment failed, the order has been cancelled.");
                }
                // Commit the transaction if payment is successful
                await transaction.CommitAsync();

                // Return order information and payment URL
                return CreatedAtAction(nameof(GetOrderById), new { orderId = order.orderId }, new
                {
                    Order = order,
                    PaymentUrl = paymentUrl
                });

            }
            catch (Exception ex)
            {
                //if catch exception rollback
                await transaction.RollbackAsync();
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
            
        }

        [HttpPost("deposit")]
        public async Task<ActionResult> Deposit([FromBody] DepositRequest depositRequest)
        {
            if (depositRequest == null || depositRequest.Amount <= 0)
            {
                return BadRequest("Invalid deposit amount.");
            }

            // Tạo đơn hàng cho deposit
            var order = new Order
            {
                orderId = Guid.NewGuid().ToString(),
                userId = depositRequest.UserId,
                orderDate = DateTime.UtcNow,
                totalAmount = depositRequest.Amount,
                Status = "Deposit"
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            // Tạo URL thanh toán VNPay
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            var paymentUrl = _vpnPayService.CreatePaymentUrl(order, ipAddress);

            // Trả về URL thanh toán
            return Ok(new { PaymentUrl = paymentUrl });
        }

    }
}
