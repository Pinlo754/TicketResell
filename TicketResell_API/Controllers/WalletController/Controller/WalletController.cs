using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.WalletController.Model;
using System;
using System.Threading.Tasks;
using TicketResell_API.Controllers.OrderController.Model;
using TicketResell_API.Controllers.User.Model;
using TicketResell_API.Controllers.Service;

namespace TicketResell_API.Controllers.WalletController.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailSender _emailSender;

        public WalletController(AppDbContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // Tạo ví mới cho người dùng
        [HttpPost("create-wallet")]
        public async Task<ActionResult<Wallet>> CreateWallet(string userId)
        {
            var existingWallet = await _context.Wallets.FirstOrDefaultAsync(w => w.userId == userId);
            if (existingWallet != null)
            {
                return BadRequest("User already has a wallet.");
            }

            var wallet = new Wallet
            {
                walletId = Guid.NewGuid().ToString(),
                userId = userId,
                balance = 0,
                status = "Active"
            };

            _context.Wallets.Add(wallet);
            await _context.SaveChangesAsync();

            return Ok(wallet);
        }

        // Lấy thông tin ví theo userId
        [HttpGet("get-by-user/{userId}")]
        public async Task<ActionResult<Wallet>> GetWalletByUserId(string userId)
        {
            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.userId == userId);
            if (wallet == null)
            {
                return NotFound("Wallet not found for this user.");
            }
            return Ok(wallet);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateOrder([FromBody] OrderWithDetails model)
        {
            try
            {
                // Kiểm tra tính hợp lệ của dữ liệu đầu vào
                if (model == null || string.IsNullOrEmpty(model.userId) || model.OrderDetails == null || !model.OrderDetails.Any())
                {
                    return BadRequest("Order data is null, User ID is missing, or no order details provided.");
                }

                // Kiểm tra sự tồn tại của ví người dùng
                var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.userId == model.userId);
                if (wallet == null)
                {
                    return BadRequest("User does not have a wallet.");
                }

                // Tính tổng số tiền đơn hàng
                decimal totalAmount = model.OrderDetails.Sum(d => d.price * d.quantity);
                if (wallet.balance < totalAmount)
                {
                    return BadRequest("Insufficient wallet balance.");
                }

                // Tạo đơn hàng
                var order = new Order
                {
                    orderId = Guid.NewGuid().ToString(),
                    userId = model.userId,
                    orderDate = DateTime.UtcNow,
                    totalAmount = totalAmount,

                };

                _context.Orders.Add(order);
                await _context.SaveChangesAsync();

                // Tạo chi tiết đơn hàng và liên kết với đơn hàng
                List<string> imagesQRList = new List<string>();
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
                        status = "Pending", // Trạng thái chi tiết đơn hàng
                        createdAt = DateTime.UtcNow
                    };
                    _context.OrderDetails.Add(orderDetail);

                    // Lấy hình ảnh QR từ Ticket và thêm vào danh sách imagesQR
                   
                    var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.ticketId == detail.ticketId);
                    if (ticket != null && ticket.imagesQR != null)
                    {
                        imagesQRList.AddRange(ticket.imagesQR);
                    }
                }
                await _context.SaveChangesAsync();

                // Cập nhật số lượng vé sau khi thanh toán
                foreach (var detail in model.OrderDetails)
                {
                    var ticket = await _context.Tickets.FirstOrDefaultAsync(t => t.ticketId == detail.ticketId);
                    if (ticket != null)
                    {
                        ticket.quantity -= detail.quantity; // Trừ đi số lượng vé đã bán
                    }
                }
                await _context.SaveChangesAsync();

                // Trừ số dư ví của người dùng
                int intTotalAmount = Convert.ToInt32(totalAmount);
                wallet.balance -= intTotalAmount;

                // Lưu giao dịch vào lịch sử giao dịch của ví
                var transaction = new Transaction
                {
                    transactionId = Guid.NewGuid().ToString(),
                    walletId = wallet.walletId,
                    amount = -intTotalAmount,
                    transactionType = "Checkout",
                    time = DateTime.Now,
                    status = "Completed",
                    balanceBefore = wallet.balance + intTotalAmount,  // Số dư trước khi trừ tiền
                    balanceAfter = wallet.balance,  // Số dư sau khi trừ tiền
                    orderId = order.orderId
                };
                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();

                // Kiểm tra và gửi email xác nhận đơn hàng
                if (_emailSender == null)
                {
                    return StatusCode(500, "Email sender service is not configured.");
                }
                var firstDetail = model.OrderDetails.First();
                if (string.IsNullOrEmpty(firstDetail.receiverEmail))
                {
                    return BadRequest("Receiver email is missing.");
                }
                if (string.IsNullOrEmpty(firstDetail.eventName))
                {
                    return BadRequest("Event name is missing.");
                }

                // Chuẩn bị thông tin và gửi email
                string ticketDetails = string.Join(", ", model.OrderDetails.Select(d => $"{d.ticketName} - {d.quantity} tickets"));
                await _emailSender.SendOrderConfirmationEmailAsync(firstDetail.receiverEmail, order.orderId, firstDetail.eventName, ticketDetails, imagesQRList.ToArray());

                // Trả về thông tin đơn hàng và xác nhận thanh toán
                return Ok(new
                {
                    Order = order,
                    Message = "Payment successful"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        // Lấy lịch sử giao dịch theo walletId
        [HttpGet("transaction-history/{walletId}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetHistoryTransaction(string walletId)
        {
            var transactions = await _context.Transactions
                                .Where(t => t.walletId == walletId)
                                .ToListAsync();

            if (!transactions.Any())
            {
                return NotFound("No transactions found for this wallet.");
            }
            return Ok(transactions);
        }

        // Nạp tiền vào ví
        [HttpPost("deposit")]
        public async Task<ActionResult> Deposit(string walletId, int amount)
        {
            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.walletId == walletId);
            if (wallet == null)
            {
                return NotFound("Wallet not found.");
            }

            var transaction = new Transaction
            {
                transactionId = Guid.NewGuid().ToString(),
                walletId = walletId,
                amount = amount,
                transactionType = "Deposit",
                time = DateTime.Now,
                status = "Completed",
                balanceBefore = wallet.balance,
                balanceAfter = wallet.balance + amount
            };

            wallet.balance += amount;
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        // Rút tiền từ ví
        [HttpPost("withdraw")]
        public async Task<ActionResult> Withdraw(string walletId, int amount)
        {
            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.walletId == walletId);
            if (wallet == null)
            {
                return NotFound("Wallet not found.");
            }

            if (wallet.balance < amount)
            {
                return BadRequest(new { message = "Transaction is not in Pending state."});
            }

            var transaction = new Transaction
            {
                transactionId = Guid.NewGuid().ToString(),
                walletId = walletId,
                amount = amount,
                transactionType = "Withdraw",
                time = DateTime.Now,
                status = "Pending",
                balanceBefore = wallet.balance,
                balanceAfter = wallet.balance - amount
            };

            wallet.balance -= amount;
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        [HttpPost("update-withdraw-status")]
        public async Task<ActionResult> UpdateWithdrawStatus(string transactionId)
        {
            // Tìm giao dịch theo transactionId
            var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.transactionId == transactionId);

            if (transaction == null)
            {
                return NotFound("Transaction not found.");
            }

            // Kiểm tra nếu giao dịch có trạng thái là Pending, cập nhật thành Completed
            if (transaction.status == "Pending")
            {
                transaction.status = "Completed";

                // Lưu các thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();

                return Ok(transaction);
            }
            else
            {
                return BadRequest("Transaction is not in Pending state.");
            }
        }

        // Nạp tiền vào ví
        [HttpPost("sell-ticket")]
        public async Task<ActionResult> SellTicket(string walletId, int amount)
        {
            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.walletId == walletId);
            if (wallet == null)
            {
                return NotFound("Wallet not found.");
            }

            var transaction = new Transaction
            {
                transactionId = Guid.NewGuid().ToString(),
                walletId = walletId,
                amount = amount,
                transactionType = "Sell ticket",
                time = DateTime.Now,
                status = "Completed",
                balanceBefore = wallet.balance,
                balanceAfter = wallet.balance + amount
            };

            wallet.balance += amount;
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }

        // Thêm hàm API để tạo yêu cầu rút tiền
        [HttpPost("withdraw-request")]
        public async Task<ActionResult> WithdrawRequest([FromBody] WithDraw model)
        {
            try
            {
                // Kiểm tra nếu ví tồn tại
                var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.walletId == model.walletId);
                if (wallet == null)
                {
                    return NotFound("Wallet not found.");
                }

                // Kiểm tra nếu số dư ví đủ để rút
                if (wallet.balance < model.amount)
                {
                    return BadRequest("Insufficient balance.");
                }

                // Tạo giao dịch với trạng thái Pending
                var transaction = new Transaction
                {
                    transactionId = Guid.NewGuid().ToString(),
                    walletId = model.walletId,
                    amount = model.amount,
                    transactionType = "Withdraw",
                    time = DateTime.Now,
                    status = "Pending", // Trạng thái giao dịch ban đầu là Pending
                    balanceBefore = wallet.balance,
                    balanceAfter = wallet.balance - model.amount
                };

                // Thêm giao dịch vào cơ sở dữ liệu
                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();

                // Tạo yêu cầu rút tiền với trạng thái ban đầu là Pending
                var withdrawRequest = new WithDraw
                {
                    withDrawId = Guid.NewGuid().ToString(),
                    walletId = model.walletId,
                    amount = model.amount,
                    status = "Pending", // Trạng thái yêu cầu rút tiền ban đầu là Pending
                    bankName = model.bankName,
                    bankAccountName = model.bankAccountName,
                    bankAccountNumber = model.bankAccountNumber,
                    transactionId = transaction.transactionId // Lưu transactionId để liên kết với giao dịch
                };

                // Thêm yêu cầu rút tiền vào cơ sở dữ liệu
                _context.WithDraws.Add(withdrawRequest);
                await _context.SaveChangesAsync();

                // Cập nhật số dư ví
                wallet.balance -= model.amount;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Withdrawal request created successfully.",
                    WithdrawRequest = withdrawRequest,
                    Transaction = transaction
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        // Lấy danh sách yêu cầu rút tiền
        [HttpGet("list-withdraw")]
        public async Task<ActionResult<IEnumerable<WithDraw>>> ListWithDraw()
        {
            try
            {
                // Truy vấn tất cả yêu cầu rút tiền từ cơ sở dữ liệu
                var withdrawRequests = await _context.WithDraws.ToListAsync();

                if (withdrawRequests == null || !withdrawRequests.Any())
                {
                    return NotFound("No withdrawal requests found.");
                }

                return Ok(withdrawRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }

        // Cập nhật trạng thái yêu cầu rút tiền
        [HttpPut("update-withdraw-status")]
        public async Task<ActionResult> UpdateWithdrawStatus(string withDrawId, string newStatus)
        {
            try
            {
                // Tìm yêu cầu rút tiền theo withDrawId
                var withdrawRequest = await _context.WithDraws.FirstOrDefaultAsync(w => w.withDrawId == withDrawId);
                if (withdrawRequest == null)
                {
                    return NotFound("Withdrawal request not found.");
                }

                // Cập nhật trạng thái của yêu cầu rút tiền
                withdrawRequest.status = newStatus;

                // Cập nhật trạng thái giao dịch liên quan
                var transaction = await _context.Transactions.FirstOrDefaultAsync(t => t.transactionId == withdrawRequest.transactionId);
                if (transaction != null)
                {
                    transaction.status = newStatus; // Cập nhật trạng thái giao dịch
                }

                // Lưu thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();

                return Ok("Withdrawal request and transaction status updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }




    }
}
