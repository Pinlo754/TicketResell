namespace TicketResell_API.Controllers.Ticket
{
    public class Ticket
    {
        public int TicketID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public int UserID { get; set; }
        public string Detail { get; set; }
        public int CategoryID { get; set; }
        public DateTime Time { get; set; }
        public int StatusID { get; set; }
        public string Location { get; set; }
        public int EventID { get; set; }
    }
}
