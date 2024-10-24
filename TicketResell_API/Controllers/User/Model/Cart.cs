namespace TicketResell_API.Controllers.User.Model
{
    public class Cart
    {
        public string? cartId { get; set; }      
        public string? userId { get; set; }
        public List<CartItem> items { get; set; } = new List<CartItem>();
    }

    public class CartItem
    {
        public string? cartItemsId { get; set; }
        public string? ticketId { get; set; }
        public int quanity { get; set; }
        public decimal Price { get; set; }
    }
}
