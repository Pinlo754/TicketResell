using Microsoft.AspNetCore.Http;
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
            //Query shopping cart data
            var cartItems = await _context.Carts
                                 .Where(c => c.userId == userId)
                                 .ToListAsync();
            //Check query results
            if (cartItems == null || !cartItems.Any())
            {
                return NotFound($"No cart items found for user {userId}.");
            }

            return Ok(cartItems);
        }

        //list all cart
        [HttpGet("list-all-cart")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetAllCarts()
        {
            try
            {
                // Get a list of all Carts from the database
                var carts = await _context.Carts.ToListAsync();

                // Check if cart list is empty
                if (carts == null || carts.Count == 0)
                {
                    return NotFound("No carts found.");
                }

                // Returns the shopping cart list
                return Ok(carts);
            }
            catch (Exception ex)
            {
                // Trả về thông báo lỗi nếu có lỗi xảy ra
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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
                //If the product already exists, update the quantity and price.
                existingCartItem.quanity += model.quanity;
                existingCartItem.price = model.price; // Có thể cập nhật giá nếu cần thiết
            }
            else
            {
                // If the product does not exist, add new to cart
                var newCartItem = new Cart
                {
                    cartId = Guid.NewGuid().ToString(),
                    userId = model.userId,
                    buyerId = model.buyerId,
                    firstName = model.firstName,
                    lastName = model.lastName,
                    ticketId = model.ticketId,
                    ticketName = model.ticketName,
                    ticketRow = model.ticketRow,
                    ticketType = model.ticketType,
                    ticketSection = model.ticketSection,
                    quanity = model.quanity,
                    price = model.price,
                    eventName = model.eventName,
                };
                _context.Carts.Add(newCartItem);
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartByUserId), new { userId = model.userId }, model);
        }

        [HttpPut("update-cart")]
        public async Task<ActionResult<Cart>> UpdateCart([FromBody] UpdateCart model)
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

            //Update cart quantity
            existingCartItem.quanity = model.quanity;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error while updating cart: {ex.Message}");
            }

            return Ok(existingCartItem);
        }
    

    [HttpDelete("remove-cart")]
    public async Task<ActionResult> DeleteCartItem([FromQuery] string userId, [FromQuery] string ticketId)
    {
            // Check input data
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(ticketId))
        {
            return BadRequest("User ID or Ticket ID is missing. Please try again.");
        }

            // Find products in user's shopping cart
            var existingCartItem = await _context.Carts
                                             .FirstOrDefaultAsync(c => c.userId == userId && c.ticketId == ticketId);

        if (existingCartItem == null)
        {
            return NotFound($"Cart item for user {userId} and ticket {ticketId} not found.");
        }

            // Remove product from cart
            _context.Carts.Remove(existingCartItem);

            // Save changes to database
            await _context.SaveChangesAsync();

        return Ok(new { Message = "Cart item deleted successfully." });
    }
}
    }

