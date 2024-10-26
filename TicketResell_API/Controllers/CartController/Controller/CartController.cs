﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using TicketResell_API.Controllers.CartController.Model;
using TicketResell_API.Controllers.TicketController.Model;

namespace TicketResell_API.Controllers.CartController.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        //Get user's shopping cart information
        [HttpGet("get-cart/{userId}")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCartByUserId(string userId)
        {
            //check if userid is null
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("UserId is required.");
            }
            var cartItems = await _context.Carts
                                 .Where(c => c.userId == userId)
                                 .ToListAsync();
            if (cartItems == null || !cartItems.Any())
            {
                return NotFound($"No cart items found for user {userId}.");
            }

            return Ok(cartItems);
        }

        [HttpPost("add-cart")]
        public async Task<ActionResult<Cart>> AddToCart([FromBody] Cart model) 
        {
            if (model == null || string.IsNullOrEmpty(model.ticketId) || model.quanity <= 0)
            {
                return BadRequest("Cart data is null or required fields are missing (UserId or TicketId).");
            }

            var existingCartItem = await _context.Carts
                                         .FirstOrDefaultAsync(c => c.userId == model.userId && c.ticketId == model.ticketId);
            if (existingCartItem != null)
            {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng và giá
                existingCartItem.quanity += model.quanity;
                existingCartItem.price = model.price; // Có thể cập nhật giá nếu cần thiết
            }
            else
            {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                var newCartItem = new Cart
                {
                    cartId = Guid.NewGuid().ToString(),
                    userId = model.userId,
                    ticketId = model.ticketId,
                    quanity = model.quanity,
                    price = model.price
                };
                _context.Carts.Add(newCartItem);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartByUserId), new { userId = model.userId }, model);
        }

        [HttpPut("update-cart")]
        public async Task<ActionResult<Cart>> UpdateCart([FromBody] Cart model)
        {
            if (model == null || string.IsNullOrEmpty(model.userId) || string.IsNullOrEmpty(model.ticketId))
            {
                return BadRequest("Cart data is null or required fields are missing (UserId or TicketId).");
            }
            var existingCartItem = await _context.Carts
                                        .FirstOrDefaultAsync(c => c.userId == model.userId && c.ticketId == model.ticketId);
            if (existingCartItem == null)
            {
                return NotFound($"Cart item for user {model.userId} and ticket {model.ticketId} not found.");
            }
            existingCartItem.quanity = model.quanity;
            existingCartItem.price = model.price;
            await _context.SaveChangesAsync();

            return Ok(existingCartItem);

        }

        [HttpDelete("remove-cart")]
        public async Task<ActionResult> DeleteCartItem([FromQuery] string userId, [FromQuery] string ticketId)
        {
            // Kiểm tra dữ liệu đầu vào
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(ticketId))
            {
                return BadRequest("User ID or Ticket ID is missing. Please try again.");
            }

            // Tìm sản phẩm trong giỏ hàng của người dùng
            var existingCartItem = await _context.Carts
                                                 .FirstOrDefaultAsync(c => c.userId == userId && c.ticketId == ticketId);

            if (existingCartItem == null)
            {
                return NotFound($"Cart item for user {userId} and ticket {ticketId} not found.");
            }

            // Xóa sản phẩm khỏi giỏ hàng
            _context.Carts.Remove(existingCartItem);

            // Lưu thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Cart item deleted successfully." });
        }

    }
}