namespace TicketResell_API.Controllers.TicketController.Model;

public partial class UpdateTicket
{
    public string ticketName { get; set; } = null!;

    public int quantity { get; set; }

    public decimal price { get; set; }

    public decimal originPrice { get; set; }

    public string[] images { get; set; } = null!;

    public string userId { get; set; }

    public string? type { get; set; }

    public string? section { get; set; }

    public int? row { get; set; }

    public string? description { get; set; }

    public string status { get; set; }

    public string eventId { get; set; }

    public DateTime? createAt { get; set; }

    public DateTime updateAt { get; set; }
}