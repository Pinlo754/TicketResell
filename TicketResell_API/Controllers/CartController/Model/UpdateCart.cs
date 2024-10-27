namespace TicketResell_API.Controllers.CartController.Model
{
    public class UpdateCart
    {
        public string? userId { get; set; }
        public string? ticketId { get; set; }
        public int quanity { get; set; }
    }
}
