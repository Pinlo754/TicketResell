using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TicketResell_API.Controllers.WalletController.Model;
using System;
using System.Threading.Tasks;

namespace TicketResell_API.Controllers.WalletController.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WalletController(AppDbContext context)
        {
            _context = context;
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

        // Tạo giao dịch
        [HttpPost("create-transaction")]
        public async Task<ActionResult> CreateTransaction(Transaction transaction)
        {
            var wallet = await _context.Wallets.FirstOrDefaultAsync(w => w.walletId == transaction.walletId);
            if (wallet == null)
            {
                return NotFound("Wallet not found.");
            }

            if (transaction.transactionType == "Deposit")
            {
                wallet.balance += transaction.amount;
            }
            else if (transaction.transactionType == "Withdraw" && wallet.balance >= transaction.amount)
            {
                wallet.balance -= transaction.amount;
            }
            else
            {
                return BadRequest("Insufficient funds or invalid transaction type.");
            }

            transaction.time = DateTime.Now;
            transaction.balanceBefore = wallet.balance + (transaction.transactionType == "Deposit" ? -transaction.amount : transaction.amount);
            transaction.balanceAfter = wallet.balance;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
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
                return BadRequest("Insufficient balance.");
            }

            var transaction = new Transaction
            {
                transactionId = Guid.NewGuid().ToString(),
                walletId = walletId,
                amount = -amount,
                transactionType = "Withdraw",
                time = DateTime.Now,
                status = "Completed",
                balanceBefore = wallet.balance,
                balanceAfter = wallet.balance - amount
            };

            wallet.balance -= amount;
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(transaction);
        }
    }
}
