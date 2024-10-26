namespace TicketResell_API.Controllers.VnPayController.Model
{
    public class VnPayPayment
    {
        public string? OrderId { get; set; }
        public decimal Amount { get; set; }
        public string? OrderDescription { get; set; }
    }
}
